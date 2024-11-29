import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import {storage} from './clientApp';

export async function uploadImage(folder: 'projects' | 'experience' | 'bio', image: File) {
	const filePath = `images/${folder}/${image.name}`;
	const newImageRef = ref(storage, filePath);
	await uploadBytesResumable(newImageRef, image);

	return await getDownloadURL(newImageRef);
}
