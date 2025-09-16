# Vercel Deployment Guide for Green Veil Trade

This guide provides step-by-step instructions for deploying the Green Veil Trade application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account with access to the repository
- Environment variables ready

## Step-by-Step Deployment Process

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click on "New Project" or "Add New..." → "Project"

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section, search for `hashmap0x/green-veil-trade`
2. Click on the repository when it appears
3. Click "Import" to proceed

### Step 3: Configure Project Settings

1. **Project Name**: `green-veil-trade` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 4: Set Environment Variables

Click on "Environment Variables" and add the following:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

#### Getting API Keys

1. **Infura API Key**:
   - Visit [Infura](https://infura.io/)
   - Create an account and new project
   - Copy your project ID

2. **WalletConnect Project ID**:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy your project ID

**Important**: Make sure to set these for all environments (Production, Preview, Development)

### Step 5: Configure Build Settings

1. **Node.js Version**: Select "18.x" or "20.x"
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install`

### Step 6: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Once deployed, you'll receive a deployment URL

### Step 7: Configure Custom Domain (Optional)

1. Go to your project dashboard
2. Click on "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Step 8: Verify Deployment

1. Visit your deployment URL
2. Test wallet connection functionality
3. Verify that the application loads correctly
4. Check that all environment variables are working

### Step 9: Set Up Automatic Deployments

1. Go to "Settings" → "Git"
2. Ensure "Automatic deployments" is enabled
3. Configure branch settings:
   - **Production Branch**: `main`
   - **Preview Branches**: `develop`, `staging` (optional)

### Step 10: Monitor and Maintain

1. Set up monitoring in Vercel dashboard
2. Configure analytics if needed
3. Set up error tracking
4. Monitor build logs for any issues

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID (11155111 for Sepolia) | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | Yes |

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are properly installed
   - Review build logs for specific errors

2. **Environment Variables Not Working**
   - Ensure variables are prefixed with `NEXT_PUBLIC_`
   - Verify variables are set for all environments
   - Check for typos in variable names

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your configuration

### Build Optimization

1. **Enable Build Caching**
   - Vercel automatically caches dependencies
   - Use `.vercelignore` for unnecessary files

2. **Performance Optimization**
   - Enable Vercel Analytics
   - Configure CDN settings
   - Optimize images and assets

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Regularly rotate API keys

2. **Access Control**
   - Configure team access in Vercel
   - Set up proper branch protection rules
   - Monitor deployment access

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)

## Deployment URL

Once deployed, your application will be available at:
- **Production**: `https://green-veil-trade.vercel.app` (or your custom domain)
- **Preview**: `https://green-veil-trade-git-[branch].vercel.app`

## Next Steps

After successful deployment:

1. Test all functionality thoroughly
2. Set up monitoring and analytics
3. Configure custom domain if needed
4. Set up CI/CD for future updates
5. Document any custom configurations
