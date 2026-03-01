const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'lib', 'mockData.ts');
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
    // Issuer details
    ['ABC University — Computer Science', 'Massachusetts Institute of Technology'],
    ['ABC University — Coding Club', 'MIT Web3 Club'],
    ['ABC University', 'MIT'],
    ['cs@abcuniversity.edu', 'web3@mit.edu'],
    ['https://cs.abcuniversity.edu', 'https://web3.mit.edu'],
    ['Department of Computer Science at ABC University', 'MIT Media Lab - Digital Currency Initiative'],

    // Credential Names
    ['React.js Proficiency', 'Web3 Foundations'],
    ['Database Fundamentals', 'Smart Contract Security'],
    ['Node.js Backend Development', 'DeFi Protocols'],
    ['API Design Mastery', 'Zero-Knowledge Proofs'],
    ['Full Stack Developer', 'Blockchain Developer Mastery'],

    // Descriptions need slightly more robust matching to avoid partial mismatch, but direct replace might work since they are unique.
    [
        'Demonstrated proficiency in React.js framework including hooks, state management, and component architecture',
        'Core concepts of blockchain technology, cryptography, and decentralized networks'
    ],
    [
        'Core knowledge of relational databases, SQL, normalization, and query optimization',
        'Advanced vulnerability analysis and secure coding practices for smart contracts'
    ],
    [
        'Proficiency in server-side development with Node.js, Express, and RESTful APIs',
        'Architecture and mechanics of decentralized finance applications'
    ],
    [
        'Advanced API design patterns, versioning, authentication, and documentation',
        'Implementation of zero-knowledge proofs and privacy-preserving protocols'
    ],
    [
        'Composite credential demonstrating mastery across frontend, backend, databases, API design, and cloud deployment',
        'Composite credential demonstrating mastery across Web3, Smart Contracts, DeFi, and ZK Proofs'
    ],
    [
        'Demonstrates mastery across frontend, backend, databases, API design, and cloud deployment',
        'Demonstrates mastery across Web3, Smart Contracts, DeFi, and ZK Proofs'
    ]
];

for (const [search, replace] of replacements) {
    // Escape standard text just in case, or use simple split/join
    content = content.split(search).join(replace);
}

// Update issuer type to university for MIT
content = content.replace(/type: "department",\s+registeredAt: NOW/g, 'type: "university",\n    registeredAt: NOW');

fs.writeFileSync(targetFile, content, 'utf8');
console.log("Mock data updated successfully.");
