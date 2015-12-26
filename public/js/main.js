var layOutDay = function (events) {
  return groupEventsIntoOverlapSlots(events);
};

function groupEventsIntoOverlapSlots(events) {

  function overlapSlotsForEvent(overlapSlots, ev) {
    return overlapSlots.filter(function (slot) {
      return ((ev.start > slot.start && ev.start < slot.end) || (ev.end < slot.end && ev.end > slot.start));
    });
  }

  function replaceExistingSlotsWithNew(allSlots, slotsForEvent, newSlot) {
    slotsForEvent.forEach(function (slot) {
      allSlots.splice(allSlots.indexOf(slot), 1);
    });

    allSlots.push(newSlot)
  }

  function prepareMergedSlot(slotsForEvent, ev) {
    var allEventsMerged = slotsForEvent.reduce(function (agg, slot) {
      return agg.concat(slot.events);
    }, []).concat(ev);

    var startTime = allEventsMerged.reduce(function (minTime, ev) {
      return Math.min(ev.start, minTime);
    }, 720);

    var endTime = allEventsMerged.reduce(function (maxTime, ev) {
      return Math.max(ev.end, maxTime);
    }, 0);

    return {start: startTime, end: endTime, events: allEventsMerged};
  }


  return events.reduce(function (overlapSlots, ev) {
    var slotsForEvent = overlapSlotsForEvent(overlapSlots, ev);

    if (!slotsForEvent.length) {
      overlapSlots.push({start: ev.start, end: ev.end, events: [ev]});
      return overlapSlots;
    }

    if (slotsForEvent.length > 1) {
      var mergedSlot = prepareMergedSlot(slotsForEvent, ev);

      replaceExistingSlotsWithNew(overlapSlots, slotsForEvent, mergedSlot);

      return overlapSlots;
    }

    var newSlot = {
      start: Math.min(slotsForEvent[0].start, ev.start),
      end: Math.max(slotsForEvent[0].end, ev.end),
      events: slotsForEvent[0].events.concat(ev)
    };

    replaceExistingSlotsWithNew(overlapSlots, slotsForEvent, newSlot);
    return overlapSlots;
  }, []);
}