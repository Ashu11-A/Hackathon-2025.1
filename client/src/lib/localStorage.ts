import { UserProfile, Internship, Skill } from "./types";
import {
  userProfile as defaultUserProfile,
  internships as defaultInternships,
} from "./data";

// Keys for localStorage
const KEYS = {
  USER_PROFILE: "conecta-vaga-user-profile",
  INTERNSHIPS: "conecta-vaga-internships",
  APPLICATIONS: "conecta-vaga-applications",
  AUTH: "conecta-vaga-auth-status",
};

// Type for user applications
export type UserApplication = {
  id: number;
  internshipId: number;
  userId: number;
  status: "pending" | "interview" | "approved" | "rejected";
  appliedAt: Date;
  coverLetter?: string;
  progress: number;
  steps: {
    name: string;
    completed: boolean;
    current: boolean;
  }[];
};

// Initialize localStorage with default data if it doesn't exist
export const initializeLocalStorage = () => {
  try {
    // Initialize user profile
    if (!localStorage.getItem(KEYS.USER_PROFILE)) {
      localStorage.setItem(
        KEYS.USER_PROFILE,
        JSON.stringify(defaultUserProfile)
      );
    }

    // Initialize internships
    if (!localStorage.getItem(KEYS.INTERNSHIPS)) {
      localStorage.setItem(
        KEYS.INTERNSHIPS,
        JSON.stringify(defaultInternships)
      );
    }

    // Initialize applications
    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
    }

    // Initialize auth status
    if (!localStorage.getItem(KEYS.AUTH)) {
      localStorage.setItem(KEYS.AUTH, JSON.stringify({ isLoggedIn: false }));
    }
  } catch (error) {
    console.error("Error initializing localStorage:", error);
  }
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  try {
    const authData = localStorage.getItem(KEYS.AUTH);
    if (authData) {
      const auth = JSON.parse(authData);
      return auth.isLoggedIn === true;
    }
    return false;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

// Logout
export const logout = (): void => {
  try {
    localStorage.setItem(KEYS.AUTH, JSON.stringify({ isLoggedIn: false }));
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Update user profile
export const updateUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

// Get user profile
export const getUserProfile = (): UserProfile => {
  try {
    const profileData = localStorage.getItem(KEYS.USER_PROFILE);
    if (profileData) {
      return JSON.parse(profileData);
    }
    return defaultUserProfile;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return defaultUserProfile;
  }
};

// Get all internships
export const getInternships = (): Internship[] => {
  try {
    const internshipsData = localStorage.getItem(KEYS.INTERNSHIPS);
    if (internshipsData) {
      const parsedInternships = JSON.parse(internshipsData);

      // Convert date strings to Date objects
      return parsedInternships.map((internship: Internship) => ({
        ...internship,
        createdAt: new Date(internship.createdAt),
        updatedAt: new Date(internship.updatedAt),
      }));
    }
    return defaultInternships;
  } catch (error) {
    console.error("Error getting internships:", error);
    return defaultInternships;
  }
};

// Get internship by ID
export const getInternshipById = (id: number): Internship | undefined => {
  try {
    const internships = getInternships();
    return internships.find((internship) => internship.id === id);
  } catch (error) {
    console.error("Error getting internship by ID:", error);
    return undefined;
  }
};

// Get all user applications
export const getUserApplications = (): UserApplication[] => {
  try {
    const applicationsData = localStorage.getItem(KEYS.APPLICATIONS);
    if (applicationsData) {
      const parsedApplications = JSON.parse(applicationsData);

      // Convert date strings to Date objects
      return parsedApplications.map((app: UserApplication) => ({
        ...app,
        appliedAt: new Date(app.appliedAt),
      }));
    }
    return [];
  } catch (error) {
    console.error("Error getting user applications:", error);
    return [];
  }
};

// Create new application
export const createApplication = (
  internshipId: number,
  coverLetter?: string
): UserApplication | null => {
  try {
    const userApplications = getUserApplications();
    const profile = getUserProfile();

    // Check if user already applied to this internship
    const existingApplication = userApplications.find(
      (app) => app.internshipId === internshipId && app.userId === profile.id
    );

    if (existingApplication) {
      console.warn("User already applied to this internship");
      return null;
    }

    // Create new application
    const newApplication: UserApplication = {
      id: Date.now(),
      internshipId,
      userId: profile.id,
      status: "pending",
      appliedAt: new Date(),
      coverLetter,
      progress: 20, // Start with 20% (application completed)
      steps: [
        { name: "Application", completed: true, current: false },
        { name: "Resume Review", completed: false, current: true },
        { name: "Technical Test", completed: false, current: false },
        { name: "HR Interview", completed: false, current: false },
        { name: "Technical Interview", completed: false, current: false },
      ],
    };

    // Update applications list
    const updatedApplications = [...userApplications, newApplication];
    localStorage.setItem(
      KEYS.APPLICATIONS,
      JSON.stringify(updatedApplications)
    );

    return newApplication;
  } catch (error) {
    console.error("Error creating application:", error);
    return null;
  }
};

// Check if user has applied to an internship
export const hasApplied = (internshipId: number): boolean => {
  try {
    const userApplications = getUserApplications();
    const profile = getUserProfile();

    return userApplications.some(
      (app) => app.internshipId === internshipId && app.userId === profile.id
    );
  } catch (error) {
    console.error("Error checking application status:", error);
    return false;
  }
};

// Get application by ID
export const getApplicationById = (id: number): UserApplication | undefined => {
  try {
    const applications = getUserApplications();
    return applications.find((app) => app.id === id);
  } catch (error) {
    console.error("Error getting application by ID:", error);
    return undefined;
  }
};

// Get recommended internships based on user profile
export const getRecommendedInternships = (
  userProfile: UserProfile,
  internships: Internship[]
): Internship[] => {
  try {
    const userSkillIds = userProfile.skills.map((skill) => skill.id);

    // Score each internship based on user skills
    const scoredInternships = internships.map((internship) => {
      let score = 0;

      // Higher score for required skills that user has
      internship.skills.forEach((skill) => {
        if (userSkillIds.includes(skill.id)) {
          score += 3;
        }
      });

      return { internship, score };
    });

    // Sort by score and return only internships
    return scoredInternships
      .sort((a, b) => b.score - a.score)
      .map((item) => item.internship);
  } catch (error) {
    console.error("Error getting recommended internships:", error);
    return [];
  }
};

// Analyze skill gaps
export const getSkillGapAnalysis = (
  userSkills: Skill[],
  internships: Internship[]
): { skill: Skill; count: number; percentage: number }[] => {
  try {
    const userSkillIds = userSkills.map((skill) => skill.id);
    const skillGapMap = new Map<string, { skill: Skill; count: number }>();
    const totalVacancies = internships.length;

    // Count occurrences of each skill in internships that user doesn't have
    internships.forEach((internship) => {
      internship.skills.forEach((skill) => {
        if (!userSkillIds.includes(skill.id)) {
          if (skillGapMap.has(skill.id.toString())) {
            const current = skillGapMap.get(skill.id.toString())!;
            current.count += 1;
            skillGapMap.set(skill.id.toString(), current);
          } else {
            skillGapMap.set(skill.id.toString(), { skill, count: 1 });
          }
        }
      });
    });

    // Convert map to array and calculate percentages
    const skillGaps = Array.from(skillGapMap.values())
      .map((item) => ({
        skill: item.skill,
        count: Math.round(item.count),
        percentage: Math.round((item.count / totalVacancies) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return skillGaps.slice(0, 5); // Return top 5 gaps
  } catch (error) {
    console.error("Error analyzing skill gaps:", error);
    return [];
  }
};

// Initialize localStorage when module is imported
initializeLocalStorage();
