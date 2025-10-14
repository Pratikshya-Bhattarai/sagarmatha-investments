#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const LARGE_FILE_THRESHOLD = 1024 * 1024; // 1MB in bytes
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'coverage',
  'local-data',
  'venv',
  'env',
  '.venv',
  '__pycache__',
  '.pytest_cache'
];

// File extensions to check
const CHECK_EXTENSIONS = [
  '.csv', '.json', '.xlsx', '.xls', '.sqlite', '.db', '.sql',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.avif',
  '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm',
  '.mp3', '.wav', '.flac', '.aac', '.ogg',
  '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2',
  '.log', '.txt', '.md'
];

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function shouldCheckFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CHECK_EXTENSIONS.includes(ext);
}

function scanDirectory(dirPath, results = []) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = path.relative(process.cwd(), fullPath);
      
      // Skip ignored patterns
      if (shouldIgnore(relativePath)) {
        continue;
      }
      
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(fullPath, results);
      } else if (stats.isFile()) {
        // Check if file should be analyzed
        if (shouldCheckFile(fullPath) || stats.size > LARGE_FILE_THRESHOLD) {
          results.push({
            path: relativePath,
            size: stats.size,
            sizeFormatted: formatBytes(stats.size),
            extension: path.extname(fullPath).toLowerCase(),
            modified: stats.mtime
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return results;
}

function main() {
  console.log('🔍 Scanning for large files...\n');
  
  const startTime = Date.now();
  const results = scanDirectory('.');
  
  // Sort by size (largest first)
  results.sort((a, b) => b.size - a.size);
  
  console.log(`📊 Found ${results.length} files to analyze\n`);
  
  // Group by size categories
  const categories = {
    'Very Large (>10MB)': [],
    'Large (1-10MB)': [],
    'Medium (100KB-1MB)': [],
    'Small (<100KB)': []
  };
  
  results.forEach(file => {
    if (file.size > 10 * 1024 * 1024) {
      categories['Very Large (>10MB)'].push(file);
    } else if (file.size > 1024 * 1024) {
      categories['Large (1-10MB)'].push(file);
    } else if (file.size > 100 * 1024) {
      categories['Medium (100KB-1MB)'].push(file);
    } else {
      categories['Small (<100KB)'].push(file);
    }
  });
  
  // Display results by category
  Object.entries(categories).forEach(([category, files]) => {
    if (files.length > 0) {
      console.log(`\n📁 ${category} (${files.length} files):`);
      console.log('─'.repeat(80));
      
      files.forEach(file => {
        const date = file.modified.toISOString().split('T')[0];
        console.log(`${file.sizeFormatted.padEnd(10)} ${file.path.padEnd(50)} ${date}`);
      });
    }
  });
  
  // Summary
  const totalSize = results.reduce((sum, file) => sum + file.size, 0);
  const largeFiles = results.filter(f => f.size > LARGE_FILE_THRESHOLD);
  
  console.log('\n📈 Summary:');
  console.log('─'.repeat(50));
  console.log(`Total files analyzed: ${results.length}`);
  console.log(`Large files (>1MB): ${largeFiles.length}`);
  console.log(`Total size: ${formatBytes(totalSize)}`);
  console.log(`Average file size: ${formatBytes(totalSize / results.length)}`);
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('─'.repeat(50));
  
  if (largeFiles.length > 0) {
    console.log('⚠️  Large files found that should be moved to local-data/:');
    largeFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file.path} (${file.sizeFormatted})`);
    });
    
    if (largeFiles.length > 10) {
      console.log(`   ... and ${largeFiles.length - 10} more files`);
    }
  }
  
  console.log('\n✅ Scan completed in', ((Date.now() - startTime) / 1000).toFixed(2), 'seconds');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { scanDirectory, formatBytes };
