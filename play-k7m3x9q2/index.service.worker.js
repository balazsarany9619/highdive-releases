// Kill-Switch: ersetzt den alten Godot-PWA-Service-Worker unter derselben URL.
// Löscht alle Caches, meldet sich ab und lädt offene Seiten neu, damit ab jetzt immer
// die aktuelle Version vom Server kommt. Bleibt so lange im Web-Build, wie alte
// Installationen unterwegs sein können (Stand 13.09.2026).
self.addEventListener('install', (event) => {
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		const keys = await caches.keys();
		await Promise.all(keys.map((key) => caches.delete(key)));
		await self.registration.unregister();
		const clients = await self.clients.matchAll({ type: 'window' });
		clients.forEach((client) => client.navigate(client.url));
	})());
});
