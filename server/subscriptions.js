// Subscriptions Routes - LX4T Platform
const express = require('express');
const Subscription = require('./models/Subscription');
const { authenticateToken } = require('./auth');

const router = express.Router();

// POST /api/subscriptions/:creatorId - Subscribe
router.post('/:creatorId', authenticateToken, (req, res) => {
    try {
        if (req.user.id === req.params.creatorId) {
            return res.status(400).json({ error: 'Cannot subscribe to yourself' });
        }
        
        const sub = Subscription.create(req.user.id, req.params.creatorId);
        res.json({ success: true, subscription: sub });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/subscriptions/:creatorId - Unsubscribe
router.delete('/:creatorId', authenticateToken, (req, res) => {
    try {
        Subscription.delete(req.user.id, req.params.creatorId);
        res.json({ success: true });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ error: 'Failed to unsubscribe' });
    }
});

// GET /api/subscriptions/check/:creatorId - Check if subscribed
router.get('/check/:creatorId', authenticateToken, (req, res) => {
    try {
        const isSubscribed = Subscription.isSubscribed(req.user.id, req.params.creatorId);
        res.json({ isSubscribed });
    } catch (error) {
        console.error('Check subscription error:', error);
        res.status(500).json({ error: 'Failed to check subscription' });
    }
});

// GET /api/subscriptions - Get user's subscriptions
router.get('/', authenticateToken, (req, res) => {
    try {
        const subscriptions = Subscription.getByUser(req.user.id);
        res.json({ subscriptions });
    } catch (error) {
        console.error('Get subscriptions error:', error);
        res.status(500).json({ error: 'Failed to get subscriptions' });
    }
});

module.exports = router;

