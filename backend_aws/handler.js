const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const express = require("express");
const app = express();

app.use(express.json());

// Accediendo a las variables de entorno
const urlBaseDatos = process.env.URL_BASE_DATOS;  // URL de la base de datos desde SSM
const snsTopicArn = process.env.SNS_TOPIC_ARN;    // ARN de SNS desde SSM

module.exports.getUsers = async () => {
  const params = {
    TableName: 'users', // Nombre de la tabla en DynamoDB
  };

  try {
    const result = await dynamoDB.scan(params).promise(); // Obtiene todos los usuarios de la tabla
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items), // Devuelve los usuarios encontrados
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener los usuarios', error }),
    };
  }
};

module.exports.createUser = async (event) => {
  try {
    const { name, cedula } = JSON.parse(event.body);
    const id = Date.now().toString();

    console.log(`Conectando a la base de datos en: ${urlBaseDatos}`);

    // Lógica para insertar el usuario en DynamoDB
    const params = {
      TableName: 'users',
      Item: {
        id,
        name,
        cedula,
      },
    };

    await dynamoDB.put(params).promise();

    // Publicar mensaje en SNS para enviar un correo
    const emailParams = {
      Message: `Nuevo usuario creado: ${name}, Cédula: ${cedula}`,
      Subject: 'Nuevo Usuario Creado',
      TopicArn: snsTopicArn, // Cambia con tu ARN de SNS
    };

    await sns.publish(emailParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ id, name, cedula }),
    };
  } catch (error) {
    console.error('Error al crear el usuario', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al crear el usuario', error }),
    };
  }
};

module.exports.updateUser = async (event) => {
  const { id } = event.pathParameters;
  const { name, cedula } = JSON.parse(event.body);

  const params = {
    TableName: 'users',
    Key: { id },
    UpdateExpression: 'SET #name = :name, #cedula = :cedula',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#cedula': 'cedula',
    },
    ExpressionAttributeValues: {
      ':name': name,
      ':cedula': cedula,
    },
    ReturnValues: 'ALL_NEW', // Devuelve los nuevos valores después de la actualización
  };

  try {
    const result = await dynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al actualizar el usuario', error }),
    };
  }
};

module.exports.deleteUser = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'users',
    Key: { id },
  };

  try {
    await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario eliminado correctamente' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al eliminar el usuario', error }),
    };
  }
};

module.exports.sendEmail = async (event) => {
  try {
    const { message, subject } = JSON.parse(event.body);

    // Publicar mensaje en SNS para enviar un correo
    const emailParams = {
      Message: message,
      Subject: subject,
      TopicArn: snsTopicArn, // Cambia con tu ARN de SNS
    };

    await sns.publish(emailParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado correctamente' }),
    };
  } catch (error) {
    console.error('Error al enviar el correo', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al enviar el correo', error }),
    };
  }
};