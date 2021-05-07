import nodemailer from "nodemailer"
import user from "../models/user.js"
import ask from "../models/ask.js"
import 'dotenv/config.js';
import nodemailermailguntransport from 'nodemailer-mailgun-transport';

const auth = {
  auth: {
    api_key: 'key-13fd560150b2f10971f19c6dccc1b9f6-2a9a428a-a9d49f54',
    domain: 'sandbox113eca2185224408a92d493e8ae25c9b.mailgun.org'

  }
}
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(nodemailermailguntransport(auth));

export const sendNotification = async (req, res) => {
   try{
 
   const {id} = req.params
   const {userid, hyperlink} = req.body
   
   userid.map(async (userid) => {
    try{
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
  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }catch(error) {res.status(500).json({error: error.message})}
})
res.send("success")

}catch(error) {res.status(500).json({error:error.message})}
}

