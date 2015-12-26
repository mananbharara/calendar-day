describe('Rendering of all event slots', function () {
  it('should sort the events according to start time', function () {
    var overlapSlot = new OverlapSlot({
      start: 30,
      end: 280,
      events: [{start: 120, end: 240}, {start: 30, end: 150}, {start: 200, end: 280}]
    });

    expect(overlapSlot.events[0].start).toEqual(30);
    expect(overlapSlot.events[1].start).toEqual(120);
    expect(overlapSlot.events[2].start).toEqual(200);
  });

  it('should decide assign adjacent column to an event if another event is already ongoing', function () {
    var overlapSlot = new OverlapSlot({
      start: 30,
      end: 280,
      events: [{start: 120, end: 240}, {start: 100, end: 180}, {start: 30, end: 150}, {start: 200, end: 280}]
    });

    expect(overlapSlot.columns).toEqual(3);
    expect(overlapSlot.columnatedEvents).toEqual([
      {start: 30, end: 150, column: 1},
      {start: 100, end: 180, column: 2},
      {start: 120, end: 240, column: 3},
      {start: 200, end: 280, column: 1}]);
  });

  it('should assign column 1 if no other event is ongoing', function () {
    var overlapSlot = new OverlapSlot({
      start: 30,
      end: 280,
      events: [{start: 120, end: 240}]
    });

    expect(overlapSlot.columns).toEqual(1);
    expect(overlapSlot.columnatedEvents).toEqual([{start: 120, end: 240, column: 1}]);
  });
});