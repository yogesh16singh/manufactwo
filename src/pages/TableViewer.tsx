import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";

import TableTwo from "../Components/Dashboard/TableTwo";
import TableOne from "../Components/Dashboard/TableOne";

interface CrmapInter {
  n: number;
  areaUnderCult: number;
  yieldOfCrop: number;
}

interface YmapInter {
  name: string;
  prod: number;
  area: number;
  yield: number;
}

const TableViewer: React.FC<{ data: any[] }> = ({ data }) => {
  const [ymap, setYmap] = useState<Record<number, YmapInter[]>>({});
  const [crmap, setCrmap] = useState<Record<string, CrmapInter>>({});

  const processCropData = (dataArray: any[]) => {
    const cropData: Record<string, CrmapInter> = {};
    const yearData: Record<number, YmapInter[]> = {};
    let currentYearIndex = 0;
    let currentYear = 1950;
    let minProduction = Infinity;
    let maxProduction = -Infinity;
    let minProductionCrop = "";
    let maxProductionCrop = "";

    dataArray.forEach((item, index) => {
      const yearIndex = Math.floor(index / 13);
      const cropName = item["Crop Name"];
      const areaUnderCultivation =
        parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
      const yieldOfCrops =
        parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
      const cropProduction =
        parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0;

      if (!cropData[cropName]) {
        cropData[cropName] = { areaUnderCult: 0, yieldOfCrop: 0, n: 0 };
      }

      cropData[cropName].areaUnderCult += areaUnderCultivation;
      cropData[cropName].yieldOfCrop += yieldOfCrops;
      cropData[cropName].n += 1;

      if (yearIndex !== currentYearIndex) {
        yearData[currentYear].push({
          name: maxProductionCrop,
          prod: maxProduction,
          area: 0,
          yield: 0,
        });
        yearData[currentYear].push({
          name: minProductionCrop,
          prod: minProduction,
          area: 0,
          yield: 0,
        });
        currentYearIndex++;
        currentYear++;
        maxProduction = -Infinity;
        minProduction = Infinity;
        maxProductionCrop = "";
        minProductionCrop = "";
      }

      if (!yearData[currentYear]) {
        yearData[currentYear] = [];
      }

      yearData[currentYear].push({
        name: cropName,
        prod: cropProduction,
        area: areaUnderCultivation,
        yield: yieldOfCrops,
      });

      if (cropProduction > maxProduction) {
        maxProductionCrop = cropName;
        maxProduction = cropProduction;
      }

      if (cropProduction < minProduction) {
        minProductionCrop = cropName;
        minProduction = cropProduction;
      }
    });

    if (yearData[currentYear]) {
      yearData[currentYear].push({
        name: maxProductionCrop,
        prod: maxProduction,
        area: 0,
        yield: 0,
      });
      yearData[currentYear].push({
        name: minProductionCrop,
        prod: minProduction,
        area: 0,
        yield: 0,
      });
    }

    return { cropData, yearData };
  };

  useEffect(() => {
    const { cropData, yearData } = processCropData(data);
    setYmap(yearData);
    setCrmap(cropData);
  }, [data]);

  return (
    <div className="Center">
      <h2>Table 1</h2>
      <TableOne yMap={ymap} />
      <br />
      <h2>Table 2</h2>
      <TableTwo crmap={crmap} />
    </div>
  );
};

export default TableViewer;
