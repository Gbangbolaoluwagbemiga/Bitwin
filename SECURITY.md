# 🔒 BitTrust Security & Deployment Guide

## ⚠️ CRITICAL: Private Keys Protection

Your `.gitignore` has been configured to protect all sensitive files. **Never commit these files:**

### Protected Files ✅

```
✅ .env.local                    # Your mnemonic phrase
✅ settings/Mainnet.toml         # Mainnet deployment config with mnemonic
✅ settings/Testnet.toml         # Testnet deployment config
✅ *.key, *.pem, *.secret        # Any private key files
✅ wallet.json                   # Wallet files
```

### Safe to Commit ✅

```
✅ .env.example                  # Template without real keys
✅ contracts/*.clar              # Smart contracts (public on blockchain anyway)
✅ README.md                     # Documentation
✅ .gitignore                    # Ignore rules
```

---

## 🔐 Your Deployment Credentials

**Deployer Address**: `SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP`

**Mnemonic Location**: `.env.local` (NEVER commit this file!)

**Contract Addresses** (Public - safe to share):
```
bittrust-core:       SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP.bittrust-core
reputation-system:   SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP.reputation-system
governance:          SP2QNSNKR3NRDWNTX0Q7R4T8WGBJ8RE8RA516AKZP.governance
```

---

## 🚀 Safe Git Workflow

### Before Committing

Always check what you're about to commit:

```bash
# Check status
git status

# Verify no sensitive files
git check-ignore -v .env.local settings/Mainnet.toml

# Review changes
git diff
```

### Committing Changes

```bash
# Add safe files only
git add .gitignore
git add contracts/
git add README.md
git add .env.example

# Commit
git commit -m "Add BitTrust contracts and documentation"

# Push
git push origin main
```

### If You Accidentally Committed Secrets

**IMMEDIATE ACTION REQUIRED:**

```bash
# 1. Remove from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local settings/Mainnet.toml" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Force push (WARNING: This rewrites history)
git push origin --force --all

# 3. ROTATE YOUR KEYS IMMEDIATELY
# Generate new mnemonic and deploy to new address
```

---

## 🛡️ Security Best Practices

### 1. Environment Variables

**Never hardcode secrets in code:**

```typescript
// ❌ BAD
const mnemonic = "ship protect endorse...";

// ✅ GOOD
const mnemonic = process.env.DEPLOYER_MNEMONIC;
```

### 2. Separate Environments

Use different mnemonics for different environments:

```
Development:  Use testnet with test mnemonic
Staging:      Use testnet with different test mnemonic
Production:   Use mainnet with secure mnemonic (stored in .env.local)
```

### 3. Access Control

- **Never share** your `.env.local` file
- **Never screenshot** files containing mnemonics
- **Never paste** mnemonics in chat/email
- **Use password manager** to store mnemonics securely

### 4. Backup Strategy

**Backup your mnemonic securely:**

1. Write it down on paper (not digital)
2. Store in a safe or safety deposit box
3. Consider using a hardware wallet for large amounts
4. Never store in cloud services (Google Drive, Dropbox, etc.)

---

## 📋 Pre-Deployment Checklist

Before deploying to mainnet:

- [ ] `.gitignore` includes all sensitive files
- [ ] No `.env.local` in git history
- [ ] No `settings/Mainnet.toml` in git history
- [ ] Mnemonic backed up securely offline
- [ ] Deployer address has sufficient STX
- [ ] Contracts tested on testnet
- [ ] Code reviewed for security issues
- [ ] Emergency pause mechanism tested

---

## 🔍 Verify Your Security

Run these commands to verify:

```bash
# 1. Check .gitignore is working
git check-ignore -v .env.local settings/Mainnet.toml
# Should show: .gitignore:X:.env.local

# 2. Verify no sensitive files tracked
git ls-files | grep -E "(\.env|Mainnet\.toml|\.key)"
# Should return nothing

# 3. Check git history for leaks
git log --all --full-history --source -- .env.local settings/Mainnet.toml
# Should return nothing

# 4. Verify current status
git status
# Should NOT show .env.local or settings/Mainnet.toml
```

---

## 🚨 Emergency Procedures

### If Private Key Compromised

1. **Immediately transfer all STX** to a new address
2. **Generate new mnemonic**
3. **Update `.env.local`** with new mnemonic
4. **Redeploy contracts** if necessary
5. **Notify users** if funds at risk

### If Contracts Have Bug

1. **Call emergency pause** (if implemented)
2. **Notify community**
3. **Fix bug in new version**
4. **Deploy updated contracts**
5. **Migrate user data** if needed

---

## 📞 Support

If you suspect a security issue:

1. **DO NOT** post publicly
2. **DO NOT** commit fixes that reveal the vulnerability
3. Contact security team privately
4. Follow responsible disclosure

---

## ✅ Current Security Status

**Protected Files**: ✅ All sensitive files in `.gitignore`  
**Git History**: ✅ No sensitive files tracked  
**Deployment Config**: ✅ Mainnet.toml protected  
**Environment Files**: ✅ .env.local protected  
**Mnemonic Safety**: ✅ Not in version control  

**Your repository is secure and ready to push!** 🎉

---

## 🎯 Next Steps

1. **Commit your changes**:
   ```bash
   git add .gitignore contracts/ README.md .env.example
   git commit -m "Add BitTrust smart contracts with security"
   git push origin main
   ```

2. **Verify on GitHub**: Check that `.env.local` and `settings/Mainnet.toml` are NOT visible

3. **Deploy frontend**: Update with mainnet contract addresses

4. **Monitor contracts**: Set up alerts for unusual activity

---

*Last updated: January 21, 2026*  
*Security review: PASSED ✅*
