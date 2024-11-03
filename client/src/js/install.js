const butInstall = document.getElementById('buttonInstall');

// Keep track of the deferred prompt
let deferredPrompt;

// TODO: Add an event handler to the beforeinstallprompt event
// Logic for installing the PWA
// Listen for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini info bar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the butInstall element
// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.style.display = 'none';
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Log the user's choice
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferredPrompt variable, since it can only be used once
    deferredPrompt = null;
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log that the app has been installed
  console.log('PWA has been installed');
});
