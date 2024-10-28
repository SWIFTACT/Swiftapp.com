

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, deliveryAreaId, vehicleId } = req.body;

  if (!firstName || !lastName || !email || !password || !phoneNumber || !deliveryAreaId || !vehicleId) {
    return res.status(400).send('Please fill in all fields');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Check if the delivery area exists
    const deliveryArea = await DeliveryArea.findById(deliveryAreaId);
    if (!deliveryArea) {
      return res.status(400).json({ message: 'Delivery area does not exist' });
    }

    // Geographic check for Ekpoma, Edo State, Nigeria
    const ekpomaCenter = { lat: 6.7430, lon: 6.1390 }; // Coordinates of Ekpoma
    const maxDistanceInKm = 20; // 20 km radius around Ekpoma

    const userLocation = deliveryArea.coordinates; // Assuming coordinates are in GeoJSON format: [lon, lat]
    const distanceFromEkpoma = calculateDistance(
      ekpomaCenter.lat, ekpomaCenter.lon,
      userLocation[1], userLocation[0]
    );

    if (distanceFromEkpoma > maxDistanceInKm) {
      return res.status(400).json({
        message: `You must be located within ${maxDistanceInKm} km of Ekpoma, Edo State, Nigeria.`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      deliveryArea: deliveryAreaId,
      vehicle: vehicleId,
    });

    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
