function layOutDay(evs) {
  var overlapSlots = groupEventsIntoOverlapSlots(evs);

  renderSlots(overlapSlots);
}