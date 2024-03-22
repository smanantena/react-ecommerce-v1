import { Email } from "../../dist/assets/smtpjs/smtp";


class SMTP {
    static sendEmail() {
        Email.send({
            Host: "smtp.gmail.com",
            Username: "manantenawithreact@gmail.com",
            Password: "manantenawithreact#88",
            To: 'randriantsoa.mananantena@gmail.com',
            From: "manantenawithreact@gmail.com",
            Subject: "Sending Email using javascript",
            Body: "Well that was easy!!",
        })
            .then(function (message) {
                alert("mail sent successfully")
            });
    }
}

export default SMTP