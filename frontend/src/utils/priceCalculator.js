/**
 * Calculate price based on size
 * @param {number} basePrice - Base price for the smallest size
 * @param {string} selectedSize - Selected size (e.g., "30ml", "50ml", "100ml")
 * @param {Array<string>} availableSizes - All available sizes for the product
 * @returns {number} - Calculated price for the selected size
 */
export const calculatePriceBySize = (basePrice, selectedSize, availableSizes) => {
  // Extract ml value from size string
  const getMlValue = (size) => {
    return parseInt(size.replace('ml', ''));
  };

  // Find the smallest size to determine base size
  const sortedSizes = [...availableSizes].sort((a, b) => 
    getMlValue(a) - getMlValue(b)
  );
  const smallestSize = sortedSizes[0];
  const smallestMl = getMlValue(smallestSize);
  const selectedMl = getMlValue(selectedSize);

  // If selected size is the smallest, return base price
  if (selectedMl === smallestMl) {
    return basePrice;
  }

  // Pricing multipliers based on size:
  // 30ml = 1.0x (base)
  // 50ml = 1.6x (60% more for 67% more product)
  // 100ml = 2.8x (180% more for 233% more product)
  
  let multiplier;
  
  if (smallestMl === 30) {
    // Base size is 30ml
    if (selectedMl === 50) {
      multiplier = 1.6;
    } else if (selectedMl === 100) {
      multiplier = 2.8;
    } else {
      // For other sizes, calculate based on ml ratio with diminishing returns
      const mlRatio = selectedMl / smallestMl;
      multiplier = 1 + (mlRatio - 1) * 0.7; // 70% of ml increase
    }
  } else if (smallestMl === 50) {
    // Base size is 50ml
    if (selectedMl === 50) {
      multiplier = 1.0;
    } else if (selectedMl === 100) {
      multiplier = 1.75; // 75% more for 100% more product
    } else {
      const mlRatio = selectedMl / smallestMl;
      multiplier = 1 + (mlRatio - 1) * 0.7;
    }
  } else {
    // For other base sizes, use proportional calculation
    const mlRatio = selectedMl / smallestMl;
    multiplier = 1 + (mlRatio - 1) * 0.7;
  }

  return Math.round(basePrice * multiplier);
};

/**
 * Format price in Indian Rupees
 * @param {number} price - Price to format
 * @returns {string} - Formatted price string with ₹ symbol
 */
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

