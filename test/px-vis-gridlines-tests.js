document.addEventListener("WebComponentsReady", function() {
  runTests();
});

function runTests(){
  suite('px-vis-gridlines does Polymer exist?', function() {
    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
  });

  suite('px-vis-gridlines basic setup works', function() {
    var baseScale = document.getElementById('baseScale'),
        baseSVG = document.getElementById('baseSVG'),
        baseXGrid = document.getElementById('baseXGrid'),
        baseYGrid = document.getElementById('baseYGrid');

    suiteSetup(function(done){
      var d = [{
        "series": [
          [1397102460000, 1],
          [1397131620000, 6],
          [1397160780000, 10],
          [1397189940000, 4],
          [1397219100000, 6]
        ]
        }],
        w = 500,
        h = 300,
        m = {
          "top": 10,
          "right": 5,
          "bottom": 50,
          "left": 50
        };
      baseSVG.set('width',w);
      baseSVG.set('height',h);
      baseSVG.set('margin',m);

      baseScale.set('width',w);
      baseScale.set('height',h);
      baseScale.set('margin',m);
      baseScale.set('chartData',d);

      baseXGrid.set('margin',m);
      baseXGrid.set('length',h);

      baseYGrid.set('margin',m);
      baseYGrid.set('length',w);
      // setTimeout(function(){done()},5000);
      done();
    });

    test('baseXGrid fixture is created', function() {
      assert.isTrue(baseXGrid !== null);
    });
    test('baseYGrid fixture is created', function() {
      assert.isTrue(baseYGrid !== null);
    });
  });

  suite('px-vis-gridlines basicXGrid works', function() {
    var baseScale = document.getElementById('baseScale'),
        baseSVG = document.getElementById('baseSVG'),
        baseXGrid = document.getElementById('baseXGrid');

    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;
    var colors = commonColors.properties.colors.value;

    test('baseXGrid ID is random', function() {
      assert.equal(baseXGrid.gridId.length,15);
      assert.equal(baseXGrid.gridId.split('_')[0],'grid');
    });

    test('baseXGrid _grid orientation', function() {
      assert.equal(baseXGrid._grid.orient(),'bottom');
    });
    test('baseXGrid _grid innerTickSize', function() {
      assert.equal(baseXGrid._grid.innerTickSize(),-240);
    });

    test('baseXGrid translateAmt', function() {
      assert.equal(JSON.stringify(baseXGrid.translateAmt),'[0,240]');
    });

    test('baseXGrid _gridGroup created', function() {
      assert.equal(baseXGrid._gridGroup.node().tagName,'g');
    });
    test('baseXGrid _gridGroup translation', function() {
          re = new RegExp(/(\w+)\((-?\d+\.?\d*)[,\s](-?\d+\.?\d*)\)/),
          s = baseXGrid._gridGroup.attr('transform'),
          arr = re.exec(s);
      assert.equal(arr[1],'translate');
      assert.equal(parseFloat(arr[2]),0);
      assert.equal(parseFloat(arr[3]),240);
    });

    suite('_gridGroup lines and path styles', function() {
      var lines,path;
      suiteSetup(function(){
        lines = baseXGrid._gridGroup.selectAll('line');
        path = baseXGrid._gridGroup.selectAll('path');
      })

      // test('correct number of lines', function() {
      //   assert.equal(lines[0].length,11);
      // });
      test('correct number of paths', function() {
        assert.equal(path[0].length,0);
      });

      test('line0 has correct fill', function() {
        assert.equal(lines[0][0].getAttribute('fill'),'none');
      });
      test('line0 has correct stroke', function() {
        assert.equal(lines[0][0].getAttribute('stroke').split(' ').join(''),colors['grey3']);
      });

      test('line3 has correct fill', function() {
        assert.equal(lines[0][3].getAttribute('fill'),'none');
      });
      test('line3 has correct stroke', function() {
        assert.equal(lines[0][3].getAttribute('stroke').split(' ').join(''),colors['grey3']);
      });

      test('line9 has correct fill', function() {
        assert.equal(lines[0][9].getAttribute('fill'),'none');
      });
      test('line3 has correct stroke', function() {
        assert.equal(lines[0][9].getAttribute('stroke').split(' ').join(''),colors['grey3']);
      });
    });
  }); //suite

  suite('px-vis-gridlines basicYGrid works', function() {
    var baseScale = document.getElementById('baseScale'),
        baseSVG = document.getElementById('baseSVG'),
        baseYGrid = document.getElementById('baseYGrid');

    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;
    var colors = commonColors.properties.colors.value;

    test('baseYGrid ID is random', function() {
      assert.equal(baseYGrid.gridId.length,15);
      assert.equal(baseYGrid.gridId.split('_')[0],'grid');
    });

    test('baseYGrid _grid orientation', function() {
      assert.equal(baseYGrid._grid.orient(),'left');
    });
    test('baseYGrid _grid innerTickSize', function() {
      assert.equal(baseYGrid._grid.innerTickSize(),-445);
    });

    test('baseYGrid translateAmt', function() {
      assert.equal(JSON.stringify(baseYGrid.translateAmt),'[0,0]');
    });

    test('baseYGrid _gridGroup created', function() {
      assert.equal(baseYGrid._gridGroup.node().tagName,'g');
    });
    test('baseYGrid _gridGroup translation', function() {
      assert.isTrue(baseYGrid._gridGroup.attr('transform') === 'translate(0,0)' || baseYGrid._gridGroup.attr('transform') === 'translate(0)');
    });

    suite('_gridGroup lines and path styles', function() {
      var lines,path;
      suiteSetup(function(){
        lines = baseYGrid._gridGroup.selectAll('line');
        path = baseYGrid._gridGroup.selectAll('path');
      })

      // test('correct number of lines', function() {
      //   assert.equal(lines[0].length,11);
      // });
      test('correct number of paths', function() {
        assert.equal(path[0].length,0);
      });

      test('line0 has correct fill', function() {
        assert.equal(lines[0][0].getAttribute('fill'),'none');
      });
      test('line0 has correct stroke', function() {
        assert.equal(lines[0][0].getAttribute('stroke').split(' ').join(''),colors['grey3']);
      });

      test('line3 has correct fill', function() {
        assert.equal(lines[0][3].getAttribute('fill'),'none');
      });
      test('line3 has correct stroke', function() {
        assert.equal(lines[0][3].getAttribute('stroke').split(' ').join(''),colors['grey3']);
      });

      test('line9 has correct fill', function() {
        assert.equal(lines[0][9].getAttribute('fill'),'none');
      });
      test('line3 has correct stroke', function() {
        assert.equal(lines[0][9].getAttribute('stroke').split(' ').join(''),colors['grey3']);
      });
    });
  }); //suite
} //runTests
