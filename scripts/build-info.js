#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get last git commit timestamp
  const lastCommitTimestamp = execSync('git log -1 --format=%ct', { encoding: 'utf8' }).trim();
  const lastCommitDate = new Date(parseInt(lastCommitTimestamp) * 1000);
  
  // Get current timestamp for build time
  const buildTime = new Date();
  
  // Create build info object
  const buildInfo = {
    lastCommit: lastCommitDate.toISOString(),
    buildTime: buildTime.toISOString(),
    timestamp: Date.now()
  };
  
  // Ensure lib directory exists
  const libDir = path.join(process.cwd(), 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  // Write build info to file
  const buildInfoPath = path.join(libDir, 'build-info.json');
  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
  
  console.log('✅ Build info generated:', buildInfo);
} catch (error) {
  console.warn('⚠️ Could not generate git build info:', error.message);
  // Fallback to current time if git is not available
  const fallbackInfo = {
    lastCommit: new Date().toISOString(),
    buildTime: new Date().toISOString(),
    timestamp: Date.now()
  };
  
  const libDir = path.join(process.cwd(), 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  const buildInfoPath = path.join(libDir, 'build-info.json');
  fs.writeFileSync(buildInfoPath, JSON.stringify(fallbackInfo, null, 2));
  console.log('📝 Fallback build info generated:', fallbackInfo);
}