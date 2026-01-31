export function generateHtmlReport(reportData) {
  let rows = '';

  function getStatusColor(status) {
    const colors = {
      passed: 'green',
      failed: 'red',
      skipped: 'orange',
    };

    return colors[status] ?? 'orange';
  }

  function renderTestRow(spec, test) {
    const result = test.results?.[0];
    if (!result) return '';

    const statusColor = getStatusColor(result.status);

    return `
      <tr>
        <td>${spec.title}</td>
        <td style="color:${statusColor}; font-weight:bold;">
          ${result.status}
        </td>
        <td>${result.duration ?? 0} ms</td>
        <td>${new Date(result.startTime).toLocaleString()}</td>
        <td>${test.projectName}</td>
      </tr>
    `;
  }

  function processSuite(suite) {
    if (!suite) return;

    suite.specs?.forEach((spec) => {
      spec.tests?.forEach((test) => {
        rows += renderTestRow(spec, test);
      });
    });

    suite.suites?.forEach(processSuite);
  }


  reportData.suites.forEach((suite) => processSuite(suite));

  function getFailedTestsCount(){
    let failedCount = 0;

    function countFailedTests(suite) {
      suite.specs?.forEach((spec) => {
        spec.tests?.forEach((test) => {
          const result = test.results?.[0];
          if (result?.status === 'failed') {
            failedCount++;
          }
        });
      });

      suite.suites?.forEach(countFailedTests);
    }

    reportData.suites.forEach((suite) => countFailedTests(suite));

    return failedCount;
  }

  function formatDuration(milliseconds) {
    const totalSeconds = Math.round(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours} hr${hours > 1 ? 's' : ''}${
        minutes ? ` ${minutes} min${minutes > 1 ? 's' : ''}` : ''
      }`;
    }

    if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }

    return `${seconds} sec${seconds !== 1 ? 's' : ''}`;
  } 


  // Summary stats
  const stats = reportData.stats;
  const summary = `
    <p><strong>Total:</strong> ${stats.expected + stats.unexpected}</p>
    <strong>Passed:</strong> ${stats.expected} &nbsp;
    <strong>Failed:</strong> ${getFailedTestsCount()} &nbsp;
    <strong>Skipped:</strong> ${stats.skipped} &nbsp;
    <strong>Flaky:</strong> ${stats.flaky} &nbsp; 
    <strong>Total Duration:</strong> ${formatDuration(stats.duration)} 
  `;

  // Return full HTML with CSS styles 
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h2 {
            color: #170e0e;
          }
          table {
            background-color: #f8fdff;
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
        </style>
      </head>
      <body>
        <h2>Playwright Test Report</h2>
        ${summary}
        <table>
          <tr>
            <th>Test</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Start Time</th>
            <th>Project</th>
          </tr>
          ${rows}
        </table>
        <br/>
        <p>Best regards,</p>
        <b>QA Team</b>
      </body>
    </html>
  `;
}