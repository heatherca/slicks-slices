const nodemailer = require('nodemailer');


function generateOrderEmail({order,total}){
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p> Please start walking over we will have your order ready very soon.</p>
    <ul>
      ${order.map(item => `<li>
        <img src="${item.thumbnail}" alt="${item.name}">
        ${item.size} ${item.name} - ${item.price}
      </li>`)}
    </ul>
    <p>Your total is <strong>${total}</strong></p>
  </div>`;
}

function wait(ms = 0){
  return new Promise((resolve,reject)=>{
      setTimeout(resolve, ms);
  })
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});


exports.handler = async(event, context) =>{
  // await wait(5000);
  const body = JSON.parse(event.body)
  // check if honey pot is full 
  if(body.mapleSyrup){
    return{
      statusCode: 400,
      body: JSON.stringify({message: "boop beed bop goodbye Err 23232"})
    }
  }
  // validate order coming in is correct 
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields){
    console.log(`Checking that ${field} is good`)
    if (!body[field]){
      return{
        statusCode: 400,
        body: JSON.stringify({
          message: `Ooops you are missing the ${field}`
        })
      }
    }
  }

  // make sure order has pizzas 
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `There are no pizzas here`
      })
    }
  }
  // send email 
  // send success or error message 


  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order!",
    html: generateOrderEmail({order: body.order, total: body.total})
  });
  return{
    statusCode: 200,
    body: JSON.stringify({message: "success"})
  }

}