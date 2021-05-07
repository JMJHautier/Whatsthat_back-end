import nodemailer from "nodemailer"
import user from "../models/user.js"
import ask from "../models/ask.js"

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jmjhautier", 
      pass: "Platon1919!", 
    },
  });

export const sendNotification = async (req, res) => {
   try{
   const {id} = req.params
   const {userid, hyperlink} = req.body
  
   userid.map(async (userid) => {
  
   const foundUser = await user.findById(userid); 
   const {email, username} = foundUser;
   const foundAsk = await ask.findById(id);
   const {whatsthat} = foundAsk;


   let info = await transporter.sendMail({
    from: '"Whats that" <jhautier@hotmail.fr>', // sender address
    to: email, // list of receivers
    subject: `Hello ${username}`, // Subject line
    
    html: `<b>Your question about $${whatsthat} has received a new answer! Check it out at <a href=${hyperlink}> ${hyperlink}</b>`, // html body
  });
  res.send("success")
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

}catch(error) {res.status(500).json({error:error.message})}
}

