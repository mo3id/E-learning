// import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
const options: ApexOptions = {
  chart: {
    type: "pie",
  },
  series: [33, 25, 13],
  labels: ["Not Completed", "Completed", "Not Started"],
  colors: ["#419A9E", "#B0A39D", "#4C5260"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
          hight:350,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const optionsColumn: ApexOptions = {
  series: [
    {
      name: "Assessments",
      data: [20, 30, 3],
    },
    {
      name: "Lessons",
      data: [73, 60, 90],
    },
  ],
  colors: ["#C11B05", "#419A9E"],
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: "12px",
      colors: ["#fff"],
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["#fff"],
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  xaxis: {
    categories: ["Deep Learning", "English", "Data structure"],
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 4,
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
  },
};

export default function Charts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <Row className="mt-5">
          <Col>
            <div>
              <h3>Progress Chart</h3>
              <Chart
                options={options}
                series={options.series}
                type="pie"
                width={500}
              />
            </div>
          </Col>
          <Col>
            <div>
              <h3>Acheivement Chart</h3>
              <Chart
                options={optionsColumn}
                series={optionsColumn.series}
                type="bar"
                width={500}
                height={600}
              />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
