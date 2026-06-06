const calculateNextReviewDate = (reviewCount) => {
  let daysToAdd;

  if (reviewCount === 0) {
    daysToAdd = 1;
  } else if (reviewCount === 1) {
    daysToAdd = 3;
  } else if (reviewCount === 2) {
    daysToAdd = 7;
  } else if (reviewCount === 3) {
    daysToAdd = 15;
  } else {
    daysToAdd = 30;
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return nextDate;
};

module.exports = calculateNextReviewDate;