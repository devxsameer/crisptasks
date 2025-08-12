// Simple PunSub Event System
const Events = {
  eventStore: {},

  on: function (eventName, callback) {
    this.eventStore[eventName] = this.eventStore[eventName] || [];
    this.eventStore[eventName].push(callback);

    return {
      remove: () => this.off(eventName, callback),
    };
  },

  off: function (eventName, callback) {
    if (this.eventStore[eventName]) {
      this.eventStore[eventName] = this.eventStore[eventName].filter(
        (cb) => cb !== callback
      );
    }
  },

  emit: function (eventName, data) {
    if (this.eventStore[eventName]) {
      this.eventStore[eventName].forEach((callback) => callback(data));
    }
  },
};
export default Events;
