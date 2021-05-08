import nodemailer from "nodemailer"
import user from "../models/user.js"
import ask from "../models/ask.js"
import 'dotenv/config.js';
// import nodemailermailguntransport from 'nodemailer-mailgun-transport';

// const auth = {
//   auth: {
//     api_key: 'key-13fd560150b2f10971f19c6dccc1b9f6-2a9a428a-a9d49f54',
//     domain: 'sandbox113eca2185224408a92d493e8ae25c9b.mailgun.org'

//   }
// }
  // create reusable transporter object using the default SMTP transport


export const sendNotification = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.USER_EMAIL, 
      pass:process.env.PASS_EMAIL, 
    },
  });
 
   const {id} = req.params
   const {userid, hyperlink} = req.body
  try{

   userid.map(async (userid) => {
   const foundUser = await user.findById(userid); 
   const {email, username} = foundUser;
   const foundAsk = await ask.findById(id);
   const {whatsthat} = foundAsk;
   let info = await transporter.sendMail({
    from: `"What's that" <jhautier@hotmail.fr>`, // sender address
    to: email, // list of receivers
    subject: `Whatsthat Alert! `, // Subject line
    
    html: `Dear ${username}, <br /> <b>Your question about $${whatsthat} has received a new answer! Check it out at <a href="https://whatsthat.netlify.app/guess/${id}> https://whatsthat.netlify.app/guess/${id}</a></b>. If you no longer want to receive those messages, please  <a href="https://whatsthat.netlify.app/user">Go to your user Profile</a> and unregister. <br /> Kind regards, <br/> Your What's that team`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
)
res.send("emails sent successfuly")
  }catch(error) {res.status(500).json({error: error.message})}


}

