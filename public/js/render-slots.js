var gridWidth = 620;

function renderSlots(slots) {
  slots.forEach(function (slot) {
    var eventWidth = (gridWidth / (slot.columns));

    slot.columnatedEvents.forEach(function (ev) {
      var $ev = $('<div class="event">');

      $ev.css({top: ev.start, height: ev.end - ev.start, width: eventWidth, left: ((ev.column - 1) * eventWidth)});

      $('.grid-container').append($ev);
    });
  });
}

