#!/bin/bash

# BitTrust Mainnet Deployment Script
# This script deploys contracts to Stacks mainnet

set -e

echo "🚀 BitTrust Mainnet Deployment"
echo "================================"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with your deployment keys"
    exit 1
fi

# Source environment variables
source .env.local

# Validate required variables
if [ -z "$DEPLOYER_MNEMONIC" ]; then
    echo "❌ Error: DEPLOYER_MNEMONIC not set in .env.local"
    exit 1
fi

echo "✅ Environment variables loaded"

# Generate mainnet deployment plan
echo "📝 Generating mainnet deployment plan..."
clarinet deployments generate --mainnet

# Review deployment plan
echo ""
echo "📋 Deployment Plan:"
echo "-------------------"
cat deployments/default.mainnet-plan.yaml

echo ""
read -p "Do you want to proceed with deployment? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

# Deploy contracts
echo "🔧 Deploying contracts to mainnet..."
clarinet deployments apply --mainnet

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update .env.local with deployed contract addresses"
echo "2. Update frontend/src/lib/contracts/addresses.ts"
echo "3. Test contract interactions on mainnet"
echo "4. Deploy frontend to production"
