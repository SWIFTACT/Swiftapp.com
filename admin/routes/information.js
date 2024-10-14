// routes/address.js
const express = require('express');
const multer = require('multer');
const information = require('../../admin/model/information');
 const uploader = require('../../admin/utils/multer')

const router = express.Router();

// Create address
router.post('/information', async (req, res) => {
  const { address, opening_hours } = req.body;

  try {
    const newAddress = new Address({
      address,
      opening_hours
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: 'Error creating address', error });
  }
});

// Get address
router.get('/information', async (req, res) => {
  try {
    const address = await Address.findOne(); // Assuming there is only one address
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving address', error });
  }
});

// Update address
router.put('/information/:id', async (req, res) => {
  const { id } = req.params;
  const { address, opening_hours } = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { address, opening_hours },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: 'Error updating address', error });
  }
});

// Add images
router.post('/information/:id/images', uploader.array('images'), async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const imageUrls = req.files.map(file => ({ url: file.path }));
    address.images.push(...imageUrls);
    await address.save();

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: 'Error adding images', error });
  }
});

// Edit images (update)
router.put('/information/:id/images', upload.array('images'), async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const imageUrls = req.files.map(file => ({ url: file.path }));
    address.images = imageUrls; // Replace existing images
    await address.save();

    res.json(address);
  } catch (error) {
    res.status(400).json({ message: 'Error updating images', error });
  }
});

module.exports = router;
