'use client'

import {
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core'

import { SerializedOrganisation } from '@/app/lib/types'

import { Header } from './Header'

const formatDate = (date: string | null) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function HomePageClient({
  orgs,
}: {
  orgs: SerializedOrganisation[]
}) {
  return (
    <main>
      <Header />
      <Container size="xl" py="xl">
        <Text ta="center" mb="lg" c="dimmed" fw={700}>
          Thank you for using this application. Kindly note that updates are
          usually made every Monday and accurate as of the date reflected.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {orgs.map((org) => (
            <Card key={org._id} shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={700} size="xl" ta="center" mt="md">
                {org.org_name}
              </Text>

              <Group justify="center" gap="xs" mb="xs">
                <Text size="sm" fw={700}>
                  {org.contact}
                </Text>
              </Group>

              <Text c="dimmed" size="sm" ta="center" mb="md">
                Last updated: {formatDate(org.last_updated)}
              </Text>

              <Divider my="sm" />

              <Text size="sm" fw={500} mb="xs">
                Programme: Main Adult Services
              </Text>

              <Grid>
                <Grid.Col span={4}>
                  <Text size="xs" c="dimmed">
                    Type
                  </Text>
                  <Text fw={700}>Total</Text>
                  <Text fw={700}>Pending</Text>
                  <Text fw={700}>Available</Text>
                </Grid.Col>
                <Grid.Col span={4} ta="center">
                  <Text size="xs" c="dimmed">
                    Female
                  </Text>
                  <Text>{org.female_capacity}</Text>
                  <Text>{org.female_pending}</Text>
                  <Text>{org.female_available}</Text>
                </Grid.Col>
                <Grid.Col span={4} ta="center">
                  <Text size="xs" c="dimmed">
                    Male
                  </Text>
                  <Text>{org.male_capacity}</Text>
                  <Text>{org.male_pending}</Text>
                  <Text>{org.male_available}</Text>
                </Grid.Col>
              </Grid>

              {org.special_prog_name && (
                <>
                  <Divider my="sm" />
                  <Text size="sm" fw={500} mb="xs">
                    Programme: {org.special_prog_name}
                  </Text>
                  <Grid>
                    <Grid.Col span={4}>
                      <Text size="xs" c="dimmed">
                        Type
                      </Text>
                      <Text fw={700}>Total</Text>
                      <Text fw={700}>Pending</Text>
                      <Text fw={700}>Available</Text>
                    </Grid.Col>
                    <Grid.Col span={4} ta="center">
                      <Text size="xs" c="dimmed">
                        Female
                      </Text>
                      {org.special_prog_female_capacity !== null ? (
                        <>
                          <Text>{org.special_prog_female_capacity}</Text>
                          <Text>{org.special_prog_female_pending}</Text>
                          <Text>{org.special_prog_female_available}</Text>
                        </>
                      ) : (
                        <Text>-</Text>
                      )}
                    </Grid.Col>
                    <Grid.Col span={4} ta="center">
                      <Text size="xs" c="dimmed">
                        Male
                      </Text>
                      {org.special_prog_male_capacity !== null ? (
                        <>
                          <Text>{org.special_prog_male_capacity}</Text>
                          <Text>{org.special_prog_male_pending}</Text>
                          <Text>{org.special_prog_male_available}</Text>
                        </>
                      ) : (
                        <Text>-</Text>
                      )}
                    </Grid.Col>
                  </Grid>
                </>
              )}

              <Divider my="sm" />

              <Paper p="xs" bg="green.1" mt="md">
                <Text size="sm">{org.special_remarks}</Text>
              </Paper>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </main>
  )
}
