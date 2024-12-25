export const checkFact = async (fact) => {
  try {
    const response = await fetch('/factcheck', { // Nisbi URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fact })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fact checking error:', error);
    return null;
  }
};