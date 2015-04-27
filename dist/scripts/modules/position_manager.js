(function() {
  window.positionManager = {
    positionAround: function(targetNode, sourceNode, forcedBottom, offsets) {
      var bodyRect, bottomSpace, showBottom, targetHeight, targetPosition, targetRect;
      if (forcedBottom == null) {
        forcedBottom = false;
      }
      if (offsets == null) {
        offsets = {
          top: 0,
          left: 0
        };
      }
      sourceNode.style.position = 'absolute';
      bodyRect = document.body.getBoundingClientRect();
      targetRect = targetNode.getBoundingClientRect();
      targetPosition = this._getOffset(targetNode);
      targetHeight = targetNode.offsetHeight;
      bottomSpace = document.documentElement.clientHeight - targetRect.bottom;
      showBottom = forcedBottom || bottomSpace > sourceNode.offsetHeight;
      if (!showBottom) {
        showBottom = bottomSpace > targetRect.top;
      }
      if (showBottom) {
        sourceNode.style.top = (targetPosition.top + targetHeight + document.body.scrollTop + offsets.top) + "px";
        return sourceNode.style.left = (targetPosition.left + document.body.scrollLeft + offsets.left) + "px";
      } else {
        sourceNode.style.top = (targetPosition.top - sourceNode.offsetHeight + document.body.scrollTop - offsets.top) + "px";
        return sourceNode.style.left = (targetPosition.left + document.body.scrollLeft + offsets.left) + "px";
      }
    },
    _getOffset: function(el) {
      var _x, _y;
      _x = _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return {
        top: _y,
        left: _x
      };
    }
  };

}).call(this);
