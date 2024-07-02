
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_URL || 'http://localhost:3000/',
    generateRobotsTxt: true, // (optional)
    // ...other options
}