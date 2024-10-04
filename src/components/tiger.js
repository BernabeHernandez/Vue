export function tigerHash(message) {
    const buffer = new TextEncoder().encode(message);
    const hash = new Uint8Array(24);  
    const prime = 0x9e3779b1; 

    for (let i = 0; i < buffer.length; i++) {
        hash[i % 24] ^= buffer[i];
        const rotated = ((hash[i % 24] >>> (i % 8)) | (hash[i % 24] << (8 - (i % 8)))) & 0xFF;
        hash[i % 24] = (rotated + prime) & 0xFF;
    }
    return Array.from(hash).slice(0, 24).map(b => b.toString(16).padStart(2, '0')).join('').replace(/0+$/, '');
}
