import {
	collection,
	addDoc,
	query,
	getDocs,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	orderBy
} from 'firebase/firestore';

import {db} from './clientApp';
import type {Bio, Experience, Project, Skill} from '$type';

export async function addProject(projectData: Project) {
	try {
		const docRef = await addDoc(collection(db, 'projects'), projectData);
		console.log('Project added with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error adding project:', error);
		throw error;
	}
}

export async function getProjects() {
	try {
		const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
	} catch (error) {
		console.error('Error fetching projects:', error);
		throw error;
	}
}

export async function getProjectById(projectId: string) {
	try {
		const docRef = doc(db, 'projects', projectId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return {id: docSnap.id, ...docSnap.data()};
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching project:', error);
		throw error;
	}
}

export async function updateProject(projectId: string, updatedData: Project) {
	try {
		const projectRef = doc(db, 'projects', projectId);
		await updateDoc(projectRef, updatedData);
		console.log('Project updated successfully.');
	} catch (error) {
		console.error('Error updating project:', error);
		throw error;
	}
}

export async function deleteProject(projectId: string) {
	try {
		const projectRef = doc(db, 'projects', projectId);
		await deleteDoc(projectRef);
		console.log('Project deleted successfully.');
	} catch (error) {
		console.error('Error deleting project:', error);
		throw error;
	}
}

export async function addSkill(skillData: Omit<Skill, 'id'>) {
	try {
		const docRef = await addDoc(collection(db, 'skills'), {
			...skillData
		});
		console.log('Skill added with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error adding skill:', error);
		throw error;
	}
}

export async function getSkills() {
	try {
		const q = query(collection(db, 'skills'), orderBy('id'));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as Skill[];
	} catch (error) {
		console.error('Error fetching skills:', error);
		throw error;
	}
}

export async function getSkillById(skillId: string): Promise<Skill | null> {
	try {
		const docRef = doc(db, 'skills', skillId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data() as Omit<Skill, 'id'>;
			return {id: docSnap.id, ...data};
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching skill:', error);
		throw error;
	}
}

export async function updateSkill(skillId: string, updatedData: Partial<Omit<Skill, 'id'>>) {
	try {
		const skillRef = doc(db, 'skills', skillId);
		await updateDoc(skillRef, updatedData);
		console.log('Skill updated successfully.');
	} catch (error) {
		console.error('Error updating skill:', error);
		throw error;
	}
}

export async function deleteSkill(skillId: string) {
	try {
		const skillRef = doc(db, 'skills', skillId);
		await deleteDoc(skillRef);
		console.log('Skill deleted successfully.');
	} catch (error) {
		console.error('Error deleting skill:', error);
		throw error;
	}
}

export async function addExperience(experienceData: Omit<Experience, 'id'>) {
	try {
		const docRef = await addDoc(collection(db, 'experience'), {
			...experienceData
		});
		console.log('Experience added with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error adding experience:', error);
		throw error;
	}
}

export async function getExperience() {
	try {
		const q = query(collection(db, 'experience'), orderBy('id'));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as Experience[];
	} catch (error) {
		console.error('Error fetching experience:', error);
		throw error;
	}
}

export async function getExperienceById(experienceId: string) {
	try {
		const docRef = doc(db, 'experience', experienceId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return {id: docSnap.id, ...docSnap.data()} as Experience;
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching experience:', error);
		throw error;
	}
}

export async function updateExperience(
	experienceId: string,
	updatedData: Partial<Omit<Experience, 'id'>>
) {
	try {
		const experienceRef = doc(db, 'experience', experienceId);
		await updateDoc(experienceRef, updatedData);
		console.log('Experience updated successfully.');
	} catch (error) {
		console.error('Error updating experience:', error);
		throw error;
	}
}

export async function deleteExperience(experienceId: string) {
	try {
		const experienceRef = doc(db, 'experience', experienceId);
		await deleteDoc(experienceRef);
		console.log('Experience deleted successfully.');
	} catch (error) {
		console.error('Error deleting experience:', error);
		throw error;
	}
}

export async function addBio(bioData: Omit<Bio, 'id'>) {
	try {
		const docRef = await addDoc(collection(db, 'bio'), {
			...bioData
		});
		console.log('Bio added with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error adding bio:', error);
		throw error;
	}
}

export async function getBio() {
	try {
		const q = query(collection(db, 'bio'), orderBy('id'));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as Bio[];
	} catch (error) {
		console.error('Error fetching bio:', error);
		throw error;
	}
}

export async function getBioById(bioId: string) {
	try {
		const docRef = doc(db, 'bio', bioId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return {id: docSnap.id, ...docSnap.data()} as Bio;
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching bio:', error);
		throw error;
	}
}

export async function updateBio(bioId: string, updatedData: Partial<Omit<Bio, 'id'>>) {
	try {
		const bioRef = doc(db, 'bio', bioId);
		await updateDoc(bioRef, updatedData);
		console.log('Bio updated successfully.');
	} catch (error) {
		console.error('Error updating bio:', error);
		throw error;
	}
}

export async function deleteBio(bioId: string) {
	try {
		const bioRef = doc(db, 'bio', bioId);
		await deleteDoc(bioRef);
		console.log('Bio deleted successfully.');
	} catch (error) {
		console.error('Error deleting bio:', error);
		throw error;
	}
}
