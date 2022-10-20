const nodemailer = require('nodemailer');

const enviarCorreo = (nombre, apellidos, dni, correo, codigoCita, especialidad, turno, fecha) => {
    let subject = `Confirmación de cita N° ${codigoCita}`;
    let html = `
    <p>${nombre},</p>
    <p>Gracias por realizar su reserva de cita. A continuación detallamos los datos registrados para la cita:</p>
    <ul>
        <li>Nombre del paciente: ${apellidos}, ${nombre}</li>
        <li>DNI: ${dni}</li>
        <li>Especialidad: ${especialidad}</li>
        <li>Turno: ${turno}</li>
        <li>Fecha: ${fecha}</li>
    </ul>

    <p>Saludos cordiales,</p>
    <p>Alpha Health - IA</p>
    `
    let transport = nodemailer.createTransport({
        host: 'mail.marco.com.pe',
        port: '587',
        secure: false,
        auth: {
            user: 'no-reply@marco.com.pe',
            pass: 'MP2022$%'
        }
      });
    
      const mailOptions = {
        from: 'no-reply@marco.com.pe',
        to: correo,
        subject: subject,
        html: html
      };
    
      transport.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
}

module.exports = enviarCorreo;