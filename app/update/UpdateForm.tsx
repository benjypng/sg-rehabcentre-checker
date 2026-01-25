'use client'

import {
  Button,
  Card,
  Divider,
  Grid,
  NumberInput,
  Text,
  TextInput,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { updateOrganisation } from '../actions'
import { SerializedOrganisation } from '../lib/types'

export default function UpdateForm({ org }: { org: SerializedOrganisation }) {
  const [formData, setFormData] = useState(org)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const res = await updateOrganisation(org._id, formData)
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
    <Card shadow="sm" p="lg" withBorder>
      <Text fw={700} mb="xs">
        Main Services
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <NumberInput
            label="Female Capacity"
            value={formData.female_capacity ?? ''}
            onChange={(v) => handleChange('female_capacity', v)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Female Pending"
            value={formData.female_pending ?? ''}
            onChange={(v) => handleChange('female_pending', v)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Female Available"
            value={formData.female_available ?? ''}
            onChange={(v) => handleChange('female_available', v)}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <NumberInput
            label="Male Capacity"
            value={formData.male_capacity ?? ''}
            onChange={(v) => handleChange('male_capacity', v)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Male Pending"
            value={formData.male_pending ?? ''}
            onChange={(v) => handleChange('male_pending', v)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Male Available"
            value={formData.male_available ?? ''}
            onChange={(v) => handleChange('male_available', v)}
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
                value={formData.special_prog_female_capacity ?? ''}
                onChange={(v) =>
                  handleChange('special_prog_female_capacity', v)
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Female Pending"
                value={formData.special_prog_female_pending ?? ''}
                onChange={(v) => handleChange('special_prog_female_pending', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Female Available"
                value={formData.special_prog_female_available ?? ''}
                onChange={(v) =>
                  handleChange('special_prog_female_available', v)
                }
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <NumberInput
                label="Male Capacity"
                value={formData.special_prog_male_capacity ?? ''}
                onChange={(v) => handleChange('special_prog_male_capacity', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Male Pending"
                value={formData.special_prog_male_pending ?? ''}
                onChange={(v) => handleChange('special_prog_male_pending', v)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Male Available"
                value={formData.special_prog_male_available ?? ''}
                onChange={(v) => handleChange('special_prog_male_available', v)}
              />
            </Grid.Col>
          </Grid>
        </>
      )}

      <TextInput
        mt="md"
        label="Special Remarks"
        value={formData.special_remarks || ''}
        onChange={(e) => handleChange('special_remarks', e.currentTarget.value)}
      />

      <Button
        mt="xl"
        onClick={handleSubmit}
        loading={loading}
        size="md"
        fullWidth
      >
        Update
      </Button>
    </Card>
  )
}
