import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { scanService } from '../services/api';

export const StatsScreen = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await scanService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando estadísticas...</Text>
      </View>
    );
  }

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.statContent}>
        <Text style={styles.statLabel}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Estadísticas</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Total de Escaneos"
          value={stats.totalScans.toString()}
          icon="📱"
          color="#3498db"
        />
        <StatCard
          title="Productos Registrados"
          value={stats.totalProducts.toString()}
          icon="📦"
          color="#2ecc71"
        />
        <StatCard
          title="Reciclables"
          value={stats.recyclableProducts.toString()}
          icon="♻️"
          color="#27ae60"
        />
        <StatCard
          title="Tasa de Reciclabilidad"
          value={stats.recycleRate}
          icon="📈"
          color="#f39c12"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Productos Más Escaneados</Text>

        {stats.mostScanned && stats.mostScanned.length > 0 ? (
          stats.mostScanned.map((item, index) => (
            <View key={index} style={styles.ranking}>
              <Text style={styles.rankingPosition}>{index + 1}</Text>
              <View style={styles.rankingContent}>
                <Text style={styles.rankingLabel}>Producto ID: {item.productId}</Text>
                <Text style={styles.rankingValue}>{item._count} escaneos</Text>
              </View>
              <View style={styles.rankingBar}>
                <View
                  style={[
                    styles.rankingBarFill,
                    {
                      width: `${(item._count / stats.mostScanned[0]._count) * 100}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay datos de escaneos aún</Text>
        )}
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Text style={styles.refreshButtonText}>🔄 Actualizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  statsGrid: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    borderLeftWidth: 4,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  ranking: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingPosition: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginRight: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  rankingContent: {
    flex: 1,
    marginRight: 12,
  },
  rankingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  rankingValue: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  rankingBar: {
    width: 100,
    height: 6,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    overflow: 'hidden',
  },
  rankingBarFill: {
    height: '100%',
    backgroundColor: '#3498db',
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    paddingVertical: 20,
  },
  loadingText: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 50,
    fontSize: 16,
  },
  refreshButton: {
    backgroundColor: '#3498db',
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
