function OverlapSlot(attrs) {
  this.start = attrs.start;
  this.end = attrs.end;
  this.events = attrs.events;

  this.events.sort(function (ev1, ev2) {
    if (ev1.start <= ev2.start) {
      return -1
    }

    return 1;
  });

  this.columnatedEvents = this.events.reduce(function (agg, ev) {
    var ongoingEvsAtStart = agg.filter(function (existingEv) {
      return ((ev.start >= existingEv.start) && (ev.start <= existingEv.end));
    });

    if (!ongoingEvsAtStart.length) {
      agg.push({start: ev.start, end: ev.end, column: 1});
      return agg;
    }

    var occupiedColumns = ongoingEvsAtStart.map(function (simEv) {
      return simEv.column
    });

    agg.push({start: ev.start, end: ev.end, column: firstAvailableIndex(occupiedColumns)});
    return agg;
  }, []);

  this.columns = Math.max.apply(null, this.columnatedEvents.map(function (ev) {
    return ev.column
  }));

  function firstAvailableIndex(occupied) {
    var maxOccupiedColumn = Math.max.apply(null, occupied);

    for (var i = 1; i <= maxOccupiedColumn; ++i) {
      if (occupied.indexOf(i) === -1) {
        return i;
      }
    }

    return maxOccupiedColumn + 1;
  }
}