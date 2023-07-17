// pages/api/svg-proxy.js
import fetch from 'isomorphic-fetch';

export default async function handler(req, res) {
    try {
        const response = await fetch('https://example.com/path/to/svg.svg');
        const svgText = await response.text();
        res.setHeader('Content-Type', 'image/svg+xml');
        res.status(200).send(svgText);
    } catch (error) {
        console.error('Error proxying SVG:', error);
        res.status(500).end();
    }
}
