var eventPadding = 5;
var gridAvailableWidth = 615;
var eventBorder = 3;

function renderSlots(slots) {
  slots.forEach(function (slot) {
    var eventWidth = (gridAvailableWidth / (slot.columns));

    slot.columnatedEvents.forEach(function (ev) {
      var $ev = sampleEvent();

      $ev.css({
        top: ev.start,
        height: ev.end - ev.start,
        width: eventWidth - (eventPadding + eventBorder),
        left: (((ev.column - 1) * eventWidth) + eventPadding)
      });

      $('.grid-container').append($ev);
    });
  });

  function sampleEvent() {
    return $('<div class="event"><div class="event-desc"><div class="event-title">Sample item</div><div class="event-location">Sample location</div></div></div>');
  }
}

