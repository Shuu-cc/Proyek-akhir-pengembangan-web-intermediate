const PushHelper = {
  async register() {
    if (!('serviceWorker' in navigator)) return;
    const reg = await navigator.serviceWorker.register('/sw.js');
    return reg;
  },

  async subscribeUser(vapidKey) {
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();

    if (existing) return existing;

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this._urlBase64ToUint8Array(vapidKey),
    });

    return sub;
  },

  async sendSubscriptionToServer(subscription) {
    const token = localStorage.getItem('token');
    if (!token) return;

    await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subscription),
    });
  },

  _urlBase64ToUint8Array(base64) {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const base64Safe = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64Safe);
    return new Uint8Array([...raw].map((c) => c.charCodeAt(0)));
  },
};

export default PushHelper;
