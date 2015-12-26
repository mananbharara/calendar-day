describe('Event grouping into overlap slots', function () {

  it('should group all events into slots', function () {
    var overlapSlots = EventGroups.groupEventsIntoOverlapSlots(
      [{"start": 30, "end": 150}, {"start": 540, "end": 600}, {"start": 610, "end": 670}]);

    expect(overlapSlots).toEqual([
      new OverlapSlot({start: 30, end: 150, events: [{start: 30, end: 150}]}),
      new OverlapSlot({start: 540, end: 600, events: [{start: 540, end: 600}]}),
      new OverlapSlot({start: 610, end: 670, events: [{start: 610, end: 670}]})
    ]);
  });

  it('should group events which have an overlap', function () {
    var overlapSlots = EventGroups.groupEventsIntoOverlapSlots(
      [{"start": 30, "end": 150}, {"start": 540, "end": 600}, {"start": 580, "end": 670}]);

    expect(overlapSlots).toEqual([
      new OverlapSlot({start: 30, end: 150, events: [{start: 30, end: 150}]}),
      new OverlapSlot({start: 540, end: 670, events: [{start: 540, end: 600}, {"start": 580, "end": 670}]})
    ]);
  });

  it('should merge overlap slots if any event occurs across multiple slots', function () {
    var overlapSlots = EventGroups.groupEventsIntoOverlapSlots([
      {"start": 480, "end": 510},
      {"start": 540, "end": 600},
      {"start": 560, "end": 620},
      {"start": 500, "end": 580}]);

    expect(overlapSlots).toEqual([
      new OverlapSlot({
        start: 480, end: 620, events: [
          {"start": 480, "end": 510},
          {"start": 540, "end": 600},
          {"start": 560, "end": 620},
          {"start": 500, "end": 580}]
      })
    ]);
  });

});