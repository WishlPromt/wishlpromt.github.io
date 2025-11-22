export async function loadFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok)
            return await response.text();
    } catch (error) {
        console.error(error);
        return null;
    }
}
