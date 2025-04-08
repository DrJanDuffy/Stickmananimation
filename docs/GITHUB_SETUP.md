# GitHub Setup for GK Animates Website

This document outlines the steps to set up the GK Animates website project on GitHub.

## Repository Setup

1. Create a new repository on GitHub named `stickmananimations`
2. Configure GitHub pages for the repository if you want to host a live demo
3. Add collaborators if needed for team development

## GitHub Integration

The project includes several GitHub-specific files:

- `.github/workflows/ci.yml` - CI pipeline for automated testing
- `.github/workflows/deploy.yml` - CD pipeline for automated deployment
- `.github/CODEOWNERS` - Defines code ownership for review requests
- `.github/pull_request_template.md` - Template for pull requests
- `.github/ISSUE_TEMPLATE/` - Templates for bug reports and feature requests

## Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for feature development
- Feature branches - Named with the format `feature/feature-name`
- Bug fix branches - Named with the format `fix/bug-name`

## Commit Guidelines

- Use descriptive commit messages
- Reference issue numbers in commits when applicable
- Keep commits focused on single changes

## Pull Request Process

1. Create a branch from `develop`
2. Make your changes and commit them
3. Push your branch to GitHub
4. Create a pull request to merge into `develop`
5. Request reviews from relevant team members
6. Merge once approved and CI passes

## GitHub Actions Workflows

The project includes automated workflows for:

- Continuous Integration: Running tests, linting, and type checking
- Continuous Deployment: Deploying to production when changes are merged to `main`

For more information on contributing to the project, see [CONTRIBUTING.md](../CONTRIBUTING.md).