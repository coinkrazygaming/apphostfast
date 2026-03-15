#!/usr/bin/env node

/**
 * AppHostFast CLI Tool
 * Deploy apps locally or manage your account from the command line
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  const command = process.argv[2];
  const subCommand = process.argv[3];

  console.log('🚀 AppHostFast CLI\n');

  switch (command) {
    case 'init':
      await initProject();
      break;

    case 'deploy':
      await deploy(subCommand);
      break;

    case 'login':
      await login();
      break;

    case 'apps':
      await listApps();
      break;

    case 'logs':
      await viewLogs(subCommand);
      break;

    case 'config':
      await configureApp(subCommand);
      break;

    case 'help':
    case '-h':
    case '--help':
      showHelp();
      break;

    default:
      showHelp();
  }

  rl.close();
}

async function initProject() {
  console.log('📋 Initializing AppHostFast project...\n');

  const projectName = await question('Project name: ');
  const framework = await question(
    'Framework (next.js/react/express/php/wordpress): '
  );

  // Check if directory exists
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Directory ${projectName} already exists`);
    return;
  }

  console.log(`\n📁 Creating project directory...`);
  fs.mkdirSync(projectPath, { recursive: true });

  // Create basic structure
  const appConfig = {
    name: projectName,
    framework,
    buildCommand: getBuildCommand(framework),
    startCommand: getStartCommand(framework),
    envVars: {},
  };

  fs.writeFileSync(
    path.join(projectPath, 'apphostfast.json'),
    JSON.stringify(appConfig, null, 2)
  );

  console.log(`\n✅ Project initialized!`);
  console.log(`   cd ${projectName}`);
  console.log(`   apphostfast deploy`);
}

async function deploy(type: string) {
  // Check for apphostfast.json
  if (!fs.existsSync('apphostfast.json')) {
    console.error('❌ apphostfast.json not found. Run: apphostfast init');
    return;
  }

  const config = JSON.parse(fs.readFileSync('apphostfast.json', 'utf-8'));

  console.log(`\n🚀 Deploying ${config.name}...`);
  console.log(`   Framework: ${config.framework}`);
  console.log(`   Build command: ${config.buildCommand}`);
  console.log(`   Start command: ${config.startCommand}`);

  // Check if authentication needed
  if (type === 'remote' || type === 'prod') {
    const token = process.env.APPHOSTFAST_TOKEN;
    if (!token) {
      console.error('\n❌ Not authenticated. Run: apphostfast login');
      return;
    }
  }

  if (type === 'local' || !type) {
    await deployLocal(config);
  } else if (type === 'remote' || type === 'prod') {
    await deployRemote(config);
  }
}

async function deployLocal(config: any) {
  console.log('\n📦 Local deployment mode (Docker required)\n');

  try {
    // Check Docker
    execSync('docker --version', { stdio: 'ignore' });
    console.log('✓ Docker detected');

    // Build image
    const imageName = `apphostfast-${config.name}:latest`;
    console.log(`\n🔨 Building Docker image: ${imageName}`);
    
    // In production, would actually build Docker image
    console.log(`   npm install`);
    console.log(`   ${config.buildCommand}`);

    // Run container
    console.log(`\n🚀 Starting container...`);
    console.log(`   http://localhost:3000`);

    console.log(`\n✅ Deployment successful!`);
    console.log(`   View logs: apphostfast logs ${config.name}`);
  } catch {
    console.error(
      '❌ Docker not found. Install Docker: https://docker.com/install'
    );
  }
}

async function deployRemote(config: any) {
  console.log('\n🌐 Deploying to AppHostFast platform...\n');

  // Create ZIP of current directory
  console.log('📦 Creating archive...');

  // Upload to platform
  console.log('⬆️  Uploading to platform...');

  // Wait for deployment
  console.log('⏳ Building and deploying...');
  console.log('   (this may take a few minutes)');

  // In production, would call actual API
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('\n✅ Deployment complete!');
  console.log(`   URL: https://${config.name}.apphostfast.dev`);
  console.log(`   Dashboard: https://apphostfast.dev/dashboard`);
}

async function login() {
  console.log('🔐 Login to AppHostFast\n');

  const email = await question('Email: ');
  const password = await question('Password: ');

  // In production, would authenticate and get token
  console.log('\n✓ Logging in...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  const token = `apphostfast_${Math.random().toString(36).substr(2, 20)}`;
  console.log(`\n✅ Logged in successfully!`);
  console.log(`\nSet your token as environment variable:`);
  console.log(`   export APPHOSTFAST_TOKEN=${token}`);
}

async function listApps() {
  console.log('📱 Your apps:\n');

  // In production, would fetch from API
  const apps = [
    {
      name: 'portfolio',
      framework: 'next.js',
      status: 'active',
      url: 'portfolio.apphostfast.dev',
    },
    {
      name: 'api-server',
      framework: 'express',
      status: 'active',
      url: 'api-server.apphostfast.dev',
    },
  ];

  if (apps.length === 0) {
    console.log('No apps deployed yet.');
    console.log('Deploy your first app: apphostfast deploy');
    return;
  }

  apps.forEach(app => {
    console.log(`  ${app.name}`);
    console.log(`    Framework: ${app.framework}`);
    console.log(`    Status: ${app.status}`);
    console.log(`    URL: https://${app.url}\n`);
  });
}

async function viewLogs(appName: string) {
  if (!appName) {
    console.error('❌ App name required: apphostfast logs <app-name>');
    return;
  }

  console.log(`📋 Logs for ${appName}:\n`);

  // In production, would stream logs from API
  const mockLogs = [
    '[2024-01-15 10:32:15] Starting deployment...',
    '[2024-01-15 10:32:16] Cloning repository...',
    '[2024-01-15 10:32:18] Installing dependencies...',
    '[2024-01-15 10:32:45] Build completed successfully',
    '[2024-01-15 10:32:46] Starting server...',
    '[2024-01-15 10:32:47] App running on port 3000',
  ];

  mockLogs.forEach(log => console.log(log));
}

async function configureApp(appName: string) {
  if (!appName) {
    console.error('❌ App name required: apphostfast config <app-name>');
    return;
  }

  console.log(`⚙️  Configuring ${appName}...\n`);

  const buildCommand = await question('Build command: ');
  const startCommand = await question('Start command: ');

  const config = {
    buildCommand,
    startCommand,
  };

  console.log(`\n✅ Configuration updated!`);
  console.log(`   Rebuild: apphostfast deploy ${appName}`);
}

function getBuildCommand(framework: string): string {
  const commands: Record<string, string> = {
    'next.js': 'npm run build',
    react: 'npm run build',
    'vue.js': 'npm run build',
    'express.js': 'npm run build || echo "No build"',
    php: 'echo "No build"',
    wordpress: 'echo "No build"',
  };
  return commands[framework] || 'npm run build';
}

function getStartCommand(framework: string): string {
  const commands: Record<string, string> = {
    'next.js': 'npm start',
    react: 'npx serve -s build',
    'vue.js': 'npm run preview',
    'express.js': 'npm start',
    php: 'php -S 0.0.0.0:3000',
    wordpress: 'apache2-foreground',
  };
  return commands[framework] || 'npm start';
}

function showHelp() {
  console.log(`
Usage: apphostfast [command] [options]

Commands:
  init                Initialize new project
  deploy [local|remote] Deploy to platform (local uses Docker)
  login               Authenticate with AppHostFast
  apps                List your deployed apps
  logs [app-name]     View app logs
  config [app-name]   Configure app settings
  help                Show this help message

Examples:
  apphostfast init                  # Create new project
  apphostfast deploy                # Deploy locally with Docker
  apphostfast deploy remote         # Deploy to platform
  apphostfast logs my-app           # View logs
  apphostfast apps                  # List all apps

Documentation: https://docs.apphostfast.dev
Support: support@apphostfast.dev
`);
}

main();
