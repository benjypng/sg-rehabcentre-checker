'use client'

import {
  Button,
  Card,
  Divider,
  Grid,
  NumberInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { adminUpdateOrganisations } from '../actions'
import { SerializedOrganisation } from '../lib/types'

export default function AdminForm({
  orgs,
}: {
  orgs: SerializedOrganisation[]
}) {
  const [formData, setFormData] = useState(orgs)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (index: number, field: string, value: any) => {
    const newData = [...formData]
    newData[index] = { ...newData[index], [field]: value }
    setFormData(newData)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const res = await adminUpdateOrganisations(formData)
    setLoading(false)
    if (res.success) {
      notifications.show({
        title: 'Success',
        message: 'Updated successfully!',
        color: 'green',
      })
      router.push('/')
      router.refresh()
    } else {
      notifications.show({
        title: 'Error',
        message: 'Error updating.',
        color: 'red',
      })
    }
  }

  return (
    <form>
      {formData.map((org, index) => (
        <Card key={org._id} shadow="sm" p="lg" mb="xl" withBorder>
          <Title order={4} mb="md">
            {org.org_name}
          </Title>

          <Text fw={700} mb="xs">
            Main Services
          </Text>
          <Grid>
            <Grid.Col span={4}>
              <NumberInput
                label="Female Capacity"
                value={org.female_capacity ?? ''}
                onChange={(v) => handleChange(index, 'female_capacity', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Female Pending"
                value={org.female_pending ?? ''}
                onChange={(v) => handleChange(index, 'female_pending', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Female Available"
                value={org.female_available ?? ''}
                onChange={(v) => handleChange(index, 'female_available', v)}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <NumberInput
                label="Male Capacity"
                value={org.male_capacity ?? ''}
                onChange={(v) => handleChange(index, 'male_capacity', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Male Pending"
                value={org.male_pending ?? ''}
                onChange={(v) => handleChange(index, 'male_pending', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Male Available"
                value={org.male_available ?? ''}
                onChange={(v) => handleChange(index, 'male_available', v)}
              />
            </Grid.Col>
          </Grid>

          {org.special_prog_name && (
            <>
              <Divider my="sm" />
              <Text fw={700} mb="xs">
                {org.special_prog_name}
              </Text>
              <Grid>
                <Grid.Col span={4}>
                  <NumberInput
                    label="Female Capacity"
                    value={org.special_prog_female_capacity ?? ''}
                    onChange={(v) =>
                      handleChange(index, 'special_prog_female_capacity', v)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    label="Female Pending"
                    value={org.special_prog_female_pending ?? ''}
                    onChange={(v) =>
                      handleChange(index, 'special_prog_female_pending', v)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    label="Female Available"
                    value={org.special_prog_female_available ?? ''}
                    onChange={(v) =>
                      handleChange(index, 'special_prog_female_available', v)
                    }
                  />
                </Grid.Col>

                <Grid.Col span={4}>
                  <NumberInput
                    label="Male Capacity"
                    value={org.special_prog_male_capacity ?? ''}
                    onChange={(v) =>
                      handleChange(index, 'special_prog_male_capacity', v)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    label="Male Pending"
                    value={org.special_prog_male_pending ?? ''}
                    onChange={(v) =>
                      handleChange(index, 'special_prog_male_pending', v)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    label="Male Available"
                    value={org.special_prog_male_available ?? ''}
                    onChange={(v) =>
                      handleChange(index, 'special_prog_male_available', v)
                    }
                  />
                </Grid.Col>
              </Grid>
            </>
          )}

          <TextInput
            mt="md"
            label="Special Remarks"
            value={org.special_remarks || ''}
            onChange={(e) =>
              handleChange(index, 'special_remarks', e.currentTarget.value)
            }
          />
        </Card>
      ))}

      <Button onClick={handleSubmit} loading={loading} size="md" fullWidth>
        Update All
      </Button>
    </form>
  )
}
