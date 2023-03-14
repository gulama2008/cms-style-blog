module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getDate()}/${
      new Date(date).getMonth() + 1
    }/${new Date(date).getFullYear()}`;
  },
  ifEqual(username1,username2,options){
    if (username1 === username2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
