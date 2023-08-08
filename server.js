const express = require('express');
const mongoose = require('mongoose');
const PartnerReq=require('./models/partnerreq');
const ApprovedPartner = require('./models/approvedpartners');
const Customer =require('./models/customers');
const Service =require('./models/service');
const serverless = require('serverless-http');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello prapanchama!');
});

app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/customers', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/services', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(200).json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// ********************************  PartnerReq *************************************
app.get('/partner-req', async (req, res) => {
    try {
      console.log("request receieved");
      const partnerRequests = await PartnerReq.find();
      res.status(200).json(partnerRequests);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  // DELETE Endpoint to delete a partner request
app.delete('/partner-req/:id', async (req, res) => {
  try {
    const partnerReqId = req.params.id;
    const deletedPartnerReq = await PartnerReq.findByIdAndDelete(partnerReqId);

    if (!deletedPartnerReq) {
      return res.status(404).json({ message: 'Partner request not found' });
    }

    res.status(200).json({ message: 'Partner request deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/request', async(req, res) => {
  try {
    const partnerrequest=await PartnerReq.create(req.body);
    res.status(200).json(partnerrequest);
  } catch (error) {
     console.log(error.message);
     res.status(500,{message:error.message})
  }
});

// ******************************** ApprovedPartner *******************************

app.get('/approved-partners', async (req, res) => {
    try {
      const approvedPartners = await ApprovedPartner.find();
      res.status(200).json(approvedPartners);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  


app.post('/approve-partner', async (req, res) => {
    try {
      const approvedPartner = await ApprovedPartner.create(req.body);
      console.log("approve request recieved")
      res.status(200).json(approvedPartner);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
app.get('/approved-partners/:contact', async (req, res) => {
    try {
      const contact = req.params.contact;
      const approvedPartner = await ApprovedPartner.findOne({ contact: contact });
  
      if (!approvedPartner) {
        return res.status(404).json({ message: 'Approved partner not found' });
      }
  
      res.status(200).json(approvedPartner);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
app.put('/approved-partners/:id/assign-work', async (req, res) => {
    try {
      const partnerId = req.params.id;
      const isOnDuty = req.body.isOnDuty;
  
      const partner = await ApprovedPartner.findByIdAndUpdate(
        partnerId,
        { isOnDuty },
        { new: true }
      );
  
      if (!partner) {
        return res.status(404).json({ message: 'Approved partner not found' });
      }
  
      res.status(200).json(partner);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/working-partners', async (req, res) => {
    try {
      const workingPartners = await ApprovedPartner.find({ isOnDuty: true });
      res.status(200).json(workingPartners);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/nonworking-partners', async (req, res) => {
    try {
      const nonworkingPartners = await ApprovedPartner.find({ isOnDuty: false });
      res.status(200).json(nonworkingPartners);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  app.put('/approved-partners/:id/update-payment', async (req, res) => {
    try {
      const partnerId = req.params.id;
      const { outstanding, paid } = req.body;
  
      const partner = await ApprovedPartner.findByIdAndUpdate(
        partnerId,
        { 
          $set: {
            'payment.outstanding': outstanding,
            'payment.paid': paid
          }
        },
        { new: true }
      );
  
      if (!partner) {
        return res.status(404).json({ message: 'Approved partner not found' });
      }
  
      res.status(200).json(partner);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  app.get('/outstanding-payments', async (req, res) => {
    try {
      const partnersWithOutstandingPayment = await ApprovedPartner.find({ 'payment.outstanding': { $gt: 0 } });
      res.status(200).json(partnersWithOutstandingPayment);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
app.get('/paid-payments', async (req, res) => {
  try {
    const paidPayments = await ApprovedPartner.find({ 'payment.paid': { $gt: 0 } });
    res.status(200).json(paidPayments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

  
  app.get('/pending-payments/total', async (req, res) => {
    try {
      const result = await ApprovedPartner.aggregate([
        {
          $group: {
            _id: null,
            totalPending: { $sum: '$payment.outstanding' }
          }
        }
      ]);
  
      const totalPending = result.length > 0 ? result[0].totalPending : 0;
  
      res.status(200).json({ totalPending });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });
  


mongoose
  .connect('mongodb+srv://admin:Adarsh7198@agumentikapi.mkzkk8d.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection established');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports.handler = serverless(app)
