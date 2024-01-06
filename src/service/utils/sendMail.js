import nodemailer from 'nodemailer';
export default async function sendmail(maildId) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sumit8962@gmail.com',
            pass: 'lxweffsqbacptank'
        },
    });

    const mailOption = {
        from: 'sumit8962@gmail.com', 
        to: maildId,
        subject: "Job Applied Successfully",
        text: "Your job application has been successfully submitted to the company"
    };

    await transporter.sendMail(mailOption, (err, info) => {
        if(err){
            console.log("Error Occured: ", err);
        }
        else{
            console.log("Email to user has been sent successfully", info.response);
        }
    })

}