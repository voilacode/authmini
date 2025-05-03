/**
 * User service for AuthMini.
 * @module services/userService
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { getDb } from '../data/db.mjs';
import { logActivity } from './activityService.mjs';

config();

/**
 * Registers a new user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Object} User ID.
 * @throws {Error} If email exists.
 * @async
 */
export async function registerUser(email, password) {
  const db = getDb();
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already exists');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { email, passwordHash },
  });
  await logActivity(user.id, 'User registered');
  return { id: user.id };
}

/**
 * Logs in a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Object} Token and user data.
 * @throws {Error} If credentials invalid.
 * @async
 */
export async function loginUser(email, password) {
  const db = getDb();
  const user = await db.user.findUnique({ where: { email } });
  if (
    !user ||
    !user.is_active ||
    !(await bcrypt.compare(password, user.passwordHash))
  ) {
    throw new Error('Invalid credentials or account disabled');
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  await logActivity(user.id, 'User logged in');
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

/**
 * Gets all users with optional filtering.
 * @param {Object} filters - Optional filters (search, active).
 * @returns {Array} Array of users.
 * @async
 */
export async function getUsers(filters = {}) {
  const db = getDb();
  const { search, active } = filters;

  const where = {};
  if (search) {
    where.email = { contains: search, mode: 'insensitive' };
  }
  if (active !== undefined) {
    where.is_active = active === 'true' || active === true;
  }

  return db.user.findMany({
    where,
    include: { profile: true },
    orderBy: { id: 'asc' },
  });
}

/**
 * Gets a user by ID with profile.
 * @param {number} userId - User ID.
 * @returns {Object} User with profile.
 * @throws {Error} If user not found.
 * @async
 */
export async function getUserById(userId) {
  const db = getDb();
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { profile: true, settings: true },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return user;
}

/**
 * Updates user profile.
 * @param {number} userId - User's ID.
 * @param {Object} profileData - Profile data.
 * @returns {Object} Updated profile.
 * @async
 */
export async function updateUserProfile(userId, profileData) {
  const db = getDb();

  // Verify user exists
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  await db.profile.upsert({
    where: { userId },
    update: profileData,
    create: { userId, ...profileData },
  });

  await logActivity(userId, 'Profile updated');
  return profileData;
}

/**
 * Updates user settings.
 * @param {number} userId - User's ID.
 * @param {Object} settingsData - Settings data.
 * @returns {Object} Updated settings.
 * @async
 */
export async function updateUserSettings(userId, settingsData) {
  const db = getDb();

  // Verify user exists
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  await db.settings.upsert({
    where: { userId },
    update: settingsData,
    create: { userId, ...settingsData },
  });

  await logActivity(userId, 'Settings updated');
  return settingsData;
}

/**
 * Changes user password.
 * @param {number} userId - User's ID.
 * @param {string} newPassword - New password.
 * @returns {Object} Success message.
 * @async
 */
export async function changeUserPassword(userId, newPassword) {
  const db = getDb();

  // Verify user exists
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  await logActivity(userId, 'Password changed');
  return { message: 'Password updated successfully' };
}

/**
 * Sets user active status.
 * @param {number} userId - User's ID.
 * @param {boolean} isActive - Active status to set.
 * @returns {Object} Updated user record.
 * @throws {Error} If user not found or invalid input.
 * @async
 */
export async function setUserActive(userId, isActive) {
  const db = getDb();

  // Validate inputs
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error('userId must be a positive integer');
  }

  if (typeof isActive !== 'boolean') {
    throw new Error('isActive must be a boolean');
  }

  try {
    const user = await db.user.update({
      where: { id: userId },
      data: { is_active: isActive },
    });

    await logActivity(userId, `User ${isActive ? 'enabled' : 'disabled'}`);

    return user;
  } catch (err) {
    if (err.code === 'P2025') {
      throw new Error(`User with ID ${userId} not found`);
    }
    throw err;
  }
}

/**
 * Deletes a user.
 * @param {number} userId - User's ID.
 * @returns {Object} Success message.
 * @throws {Error} If user not found.
 * @async
 */
export async function deleteUser(userId) {
  const db = getDb();

  try {
    // Delete related records first due to foreign key constraints
    await db.profile.deleteMany({ where: { userId } });
    await db.settings.deleteMany({ where: { userId } });
    await db.activityLog.deleteMany({ where: { userId } });

    // Delete the user
    await db.user.delete({ where: { id: userId } });

    return { message: `User with ID ${userId} deleted successfully` };
  } catch (err) {
    if (err.code === 'P2025') {
      throw new Error(`User with ID ${userId} not found`);
    }
    throw err;
  }
}
