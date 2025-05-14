import React, { useState, useEffect } from 'react';
import { Table, Title, Divider } from '@mantine/core';
import MentorCard from '../../components/MentorCard';
const PredictorResults = ({ data, title, imageSrc, mentorName, college }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [sortedData, setSortedData] = useState(data);

  // Handle sorting whenever data or sortConfig changes
  useEffect(() => {
    if (!sortConfig.key) {
      setSortedData(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setSortedData(sorted);
  }, [data, sortConfig]);

  // Handle column header click
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    sortedData.length > 0 && (
      <>
        <Title order={3} mt="md" mb="sm">
          {title}
        </Title>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table striped highlightOnHover withTableBorder withRowBorders withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => handleSort('institute')}>
                  Institute {sortConfig.key === 'institute' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => handleSort('program')}>
                  Program {sortConfig.key === 'program' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </Table.Th>
                <Table.Th>State</Table.Th>
                <Table.Th>Quota</Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => handleSort('opening_rank')}>
                  Opening Rank {sortConfig.key === 'opening_rank' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </Table.Th>
                <Table.Th style={{ cursor: 'pointer' }} onClick={() => handleSort('closing_rank')}>
                  Closing Rank {sortConfig.key === 'closing_rank' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sortedData.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.institute}</Table.Td>
                  <Table.Td>{item.program}</Table.Td>
                  <Table.Td>{item.state || '-'}</Table.Td>
                  <Table.Td>{item.quota || '-'}</Table.Td>
                  <Table.Td>{item.opening_rank}</Table.Td>
                  <Table.Td>{item.closing_rank}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        <Divider my="lg" />
        <MentorCard imageSrc={imageSrc} mentorName={mentorName} college={college}/>
      </>
    )
  );
};

export default PredictorResults;
